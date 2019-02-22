var dynogels = require('dynogels');
const AWS = dynogels.AWS;
const dynamodb = new AWS.DynamoDB();
const { Trade, Stock, Stockprice, User } = require('../models/index');
var _ = require('lodash');
class StockMarket {

    /*
    Only way to delete items from dynamodb is to do it Iteratively since we have to clear all record we are droping table and recreating it.
    */
    emptyTable() {
        return new Promise((resolve, reject) => {
            Trade.deleteTable(function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    dynogels.createTables(function (err) {
                        if (err) {
                            console.log("error while creating table");
                            console.log(err);
                            reject(err);
                        } else {
                            resolve("Successfully cleared table");
                        }
                    });
                }
            });
        });
    }
    async getallTrades() {
        try {
            let data = await this.scanTrade();
            if (data.Count > 0) {
                let data_v1 = [];
                data.Items.forEach(element => {
                    data_v1.push(element.attrs);
                });
                return _.sortBy(data_v1, 'id');
            } else
                return { Message: "No trading data Exist." }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createTrade(data) {
        try {
            let trade = await this.getTradeById(data.id);
            if (trade !== null) {
                console.log('Trading ID already Exist');
                return {
                    Type: "Error",
                    Message: 'Duplicate Error : Trade ID already Exist.',
                    code: 400
                };
            }
            let user = await this.getUserById(data.userid);
            if (user == null) {
                return {
                    Type: "Error",
                    Message: 'Validation Error: User ID is not valid',
                    code: 422
                };
            } else {
                let d = await this.generateTrade(data);
                return { data: d, code: 201, status: "success" };
            }
        } catch (error) {
            throw error;
        }
    }

    async getTradeReportByUser(userid) {
        try {
            let user = await this.getUserById(userid);
            if (user == null)
                return {
                    Type: "Error",
                    Message: 'Validation Error: User ID does not Exist',
                    code: 404
                };
            else {
                let data = await this.getTradeByUser(userid);
                if (data.Count > 0) {
                    let data_v1 = [];
                    data.Items.forEach(element => {
                        data_v1.push(element.attrs);
                    });
                    return { data: _.sortBy(data_v1, 'id'), code: 200, status: "success" };
                }else{
                    return {Message: 'User has not conducted any trades',code : 200, status: 'success'}
                }
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getReportByTypeAndStock(symbol, type, start, end) {
        try {
            let stock = await this.getStockBySymbol(symbol);
            if (stock == null) {
                return {
                    Type: "Error",
                    Message: 'Validation Error : Stock dont exist in the List',
                    code: 404
                };
            }
            let data = await this.getTradeByStockType(symbol, type);
            let startdate = new Date(start + 'T00:00:00.000Z');
            let enddate = new Date(end + 'T23:59:59.999Z');
            if (data.Count > 0) {
                let data_v1 = [];
                data.Items.forEach(element => {
                    let timestamp = new Date(element.attrs.createdAt);
                    if (timestamp.getTime() >= startdate.getTime() && timestamp.getTime() <= enddate.getTime()) {
                        data_v1.push(element.attrs);
                    }
                });
                if (data_v1.length > 0)
                    return { data: _.sortBy(data_v1, 'id'), code: 200, status: "success" };
                else return { Message: "There are no trades in the given date range", code: 200, status: "success" };
            } else
                return { Message: "There are no trades in the given date range", code: 200, status: "success" };
        } catch (error) {
            console.log(error.toString());

        }
    }

    async getStockHighLow(symbol, start, end) {
        try {
            let stock = await this.getStockBySymbol(symbol);
            if (stock == null) {
                return {
                    Type: "Error",
                    Message: 'Validation Error : Stock dont exist in the List',
                    code: 404
                };
            }
            let data = await this.getStockPrice(symbol, start, end);
            if (data.Count > 0) {
                let data_v1 = [];
                data.Items.forEach(element => {
                    data_v1.push(element.attrs);
                });
                let result = _.sortBy(data_v1, 'price');
                return {
                    symbol: symbol,
                    highest: result[0].price,
                    lowest: result[result.length - 1].price,
                }
            } else {
                return {
                    Type: "Error",
                    Message: 'There are no trades in the given date range',
                    code: 404
                }
            }

        } catch (error) {

        }
    }

    getStockPrice(symbol, startdate, enddate) {
        return new Promise((resolve, reject) => {
            Stockprice.query(symbol)
                .usingIndex('symbol-index')
                .filterExpression('#timestamp BETWEEN :startdate AND :enddate')
                .expressionAttributeValues({ ':startdate': startdate + 'T00:00:00.000Z', ':enddate': enddate + 'T23:59:59.999Z' })
                .expressionAttributeNames({ '#timestamp': 'timestamp' })
                .loadAll()
                .exec((error, data) => {
                    if (error) {
                        reject(error)
                    }
                    else {
                        resolve(data);
                    }
                });
        });
    }

    getTradeByStockType(symbol, type) {
        return new Promise((resolve, reject) => {
            Trade.query(symbol)
                .usingIndex('symbol-index')
                .filter('type')
                .equals(type.toUpperCase())
                .loadAll()
                .exec((error, data) => {
                    if (error)
                        reject(error)
                    else {
                        resolve(data);
                    }
                });
        });
    }

    generateTrade(data) {
        return new Promise((resolve, reject) => {
            Trade.create(data, (error, data) => {
                if (error)
                    reject(error);
                else
                    resolve(data);
            })
        });
    }

    getTradeByUser(userid) {
        return new Promise((resolve, reject) => {
            Trade.query(userid)
                .usingIndex('userid-index')
                .loadAll()
                .exec((error, data) => {
                    if (error)
                        reject(error)
                    else {
                        resolve(data);
                    }
                });
        });
    }

    getTradeById(id) {
        return new Promise((resolve, reject) => {
            Trade.get(id, (error, data) => {
                if (error)
                    reject(error);
                else
                    resolve(data);
            });
        });
    }

    scanTrade() {
        return new Promise((resolve, reject) => {
            Trade
                .scan()
                .loadAll()
                .exec((error, data) => {
                    if (error)
                        reject(error);
                    else
                        resolve(data);
                });
        });
    }

    getUserById(userid) {
        return new Promise((resolve, reject) => {
            User.get(userid, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    getStockBySymbol(symbol) {
        return new Promise((resolve, reject) => {
            Stock.get(symbol, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
module.exports = { StockMarket };