const { Trade, Stock, Stockprice, User } = require('../../models/index');
const { StockMarket } = require('../../services/stock.service');
describe("***********Unit Tests for Stock Service***********", () => {
    let service, model;
    describe("***********Unit Tests for getStockBySymbol passed successfully***********", () => {
        let dummydata = {
            "name": "Stock8",
            "symbol": "s8",
            "createdAt": "2019-02-18T05:50:04.477Z"
        }
        beforeEach(() => {
            spyOn(Stock, 'get').and.callFake(function(event, callback) {
                callback(null, dummydata)});
        });
        it('should succeed and return getStockBySymbol', (done) => {
            service = new StockMarket();
            service.getStockBySymbol('s8').then((data) => {
                expect(data).toEqual(dummydata);
                expect(Stock.get).toHaveBeenCalled();
                done();
            })
        });
    });

    describe("***********Unit Tests for getStockBySymbol returned error successfully***********", () => {
        let errorMsg = {
            "status": "Error",
            "code": 500,
            "Message": "Error fetch Stock Details"
        }
        beforeEach(() => {
            spyOn(Stock, 'get').and.callFake(function(event, callback) {
                callback(errorMsg, null)});
        });
        it('should  fail and return error', (done) => {
            service = new StockMarket();
            service.getStockBySymbol('s8').then((data) => {
            }).catch(error=>{
                expect(error).toEqual(errorMsg);
                expect(Stock.get).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for getUserById passed successfully***********", () => {
        let dummydata = {
            "name": "User9",
            "id": "u9",
            "createdAt": "2019-02-18T05:50:04.477Z"
        }
        beforeEach(() => {
            spyOn(User, 'get').and.callFake(function(event, callback) {
                callback(null, dummydata)});
        });
        it('should succeed and return getUserById', (done) => {
            service = new StockMarket();
            service.getUserById('u9').then((data) => {
                expect(data).toEqual(dummydata);
                expect(User.get).toHaveBeenCalled();
                done();
            })
        });
    });

    describe("***********Unit Tests for getUserById returned error successfully***********", () => {
        let errorMsg = {
            "status": "Error",
            "code": 500,
            "Message": "Error fetch User Details"
        }
        beforeEach(() => {
            spyOn(User, 'get').and.callFake(function(event, callback) {
                callback(errorMsg, null)});
        });
        it('should  fail and return error', (done) => {
            service = new StockMarket();
            service.getUserById('u9').then((data) => {
            }).catch(error=>{
                expect(error).toEqual(errorMsg);
                expect(User.get).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for scanTrade passed successfully***********", () => {
        let dummydata = {
            "Items": [{
                "shares": "30",
                "symbol": "s3",
                "createdAt": "2018-04-03T13:07:21.010Z",
                "price": "195.65",
                "id": "6",
                "type": "SELL",
                "userid": "u1"
            },
            {
                "shares": "30",
                "symbol": "s2",
                "createdAt": "2018-04-03T13:07:21.010Z",
                "price": "195.65",
                "id": "4",
                "type": "SELL",
                "userid": "u1"
            }],
            "Count": 6,
            "ScannedCount": 6,
            "ConsumedCapacity": null
        }
        beforeEach(() => {
            Trade.scan=jasmine.createSpy("EventScan");
            loadAllSpy = {
                loadAll: jasmine.createSpy("loadAll")
            };
            executionSpy = {
                exec: jasmine.createSpy("exec"),
            };
            Trade.scan.and.callFake(() => loadAllSpy);
            loadAllSpy.loadAll.and.callFake(()=>executionSpy);
            executionSpy.exec.and.callFake(callback => callback(null, dummydata));
        });
        it('should succeed and return scanTrade', (done) => {
            service = new StockMarket();
            service.scanTrade().then((data) => {
                expect(data).toEqual(dummydata);
                expect(Trade.scan).toHaveBeenCalled();
                done();
            })
        });
    });

    describe("***********Unit Tests for scanTrade returned error successfully***********", () => {
        let errmsg = {
                "status": "Error",
                "code": 500,
                "Message": "Error fetch User Details"
        }
        beforeEach(() => {
            Trade.scan=jasmine.createSpy("EventScan");
            loadAllSpy = {
                loadAll: jasmine.createSpy("loadAll")
            };
            executionSpy = {
                exec: jasmine.createSpy("exec"),
            };
            Trade.scan.and.callFake(() => loadAllSpy);
            loadAllSpy.loadAll.and.callFake(()=>executionSpy);
            executionSpy.exec.and.callFake(callback => callback(errmsg, null));
        });
        it('should succeed and return scanTrade', (done) => {
            service = new StockMarket();
            service.scanTrade().then((data) => {

            }).catch(err=>{
                expect(err).toEqual(errmsg);
                expect(Trade.scan).toHaveBeenCalled();
                done();
            })
        });
    });

    describe("***********Unit Tests for getTradeById passed successfully***********", () => {
        let dummydata = {
                "shares": "30",
                "symbol": "s2",
                "createdAt": "2018-04-03T13:07:21.010Z",
                "price": "195.65",
                "id": "4",
                "type": "SELL",
                "userid": "u1"
            }
        beforeEach(() => {
            spyOn(Trade, 'get').and.callFake(function(event, callback) {
                callback(null, dummydata)});
        });
        it('should succeed and return getTradeById', (done) => {
            service = new StockMarket();
            service.getTradeById(4).then((data) => {
                expect(data).toEqual(dummydata);
                expect(Trade.get).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for getTradeById returned error successfully***********", () => {
        let errmsg = {
            "status": "Error",
            "code": 500,
            "Message": "Error fetch Trade Details"
        }
        beforeEach(() => {
            spyOn(Trade, 'get').and.callFake(function(event, callback) {
                callback(errmsg, null)});
        });
        it('shoul return error getTradeById', (done) => {
            service = new StockMarket();
            service.getTradeById(4).then(data => {
            }).catch(err=>{
                expect(err).toEqual(errmsg);
                expect(Trade.get).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for getTradeByUser passed successfully***********", () => {
        let dummydata = {
                "shares": "30",
                "symbol": "s2",
                "createdAt": "2018-04-03T13:07:21.010Z",
                "price": "195.65",
                "id": "4",
                "type": "SELL",
                "userid": "u1"
            }
        beforeEach(() => {
            Trade.query=jasmine.createSpy("EventQuery");

            usingIndexSpy = {
                usingIndex:jasmine.createSpy("usingIndex")
            }
            loadAllSpy = {
                loadAll: jasmine.createSpy("loadAll")
            };
            executionSpy = {
                exec: jasmine.createSpy("exec"),
            };
            Trade.query.and.callFake(() => usingIndexSpy);
            usingIndexSpy.usingIndex.and.callFake(() => loadAllSpy);
            loadAllSpy.loadAll.and.callFake(() => executionSpy);
            executionSpy.exec.and.callFake(callback => callback(null,dummydata));
        });
        it('should succeed and return getTradeByUser', (done) => {
            service = new StockMarket();
            service.getTradeByUser('u1').then((data) => {
                expect(data).toEqual(dummydata);
                expect(Trade.query).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for getTradeByUser returned Error successfully***********", () => {
        let errMsg = {
            "code":500,
            "status":"error",
            "message":"Error fetching Trade details by userid"
            }
        beforeEach(() => {
            Trade.query=jasmine.createSpy("EventQuery");

            usingIndexSpy = {
                usingIndex:jasmine.createSpy("usingIndex")
            }
            loadAllSpy = {
                loadAll: jasmine.createSpy("loadAll")
            };
            executionSpy = {
                exec: jasmine.createSpy("exec"),
            };
            Trade.query.and.callFake(() => usingIndexSpy);
            usingIndexSpy.usingIndex.and.callFake(() => loadAllSpy);
            loadAllSpy.loadAll.and.callFake(() => executionSpy);
            executionSpy.exec.and.callFake(callback => callback(errMsg,null));
        });
        it('should succeed and return getTradeByUser', (done) => {
            service = new StockMarket();
            service.getTradeByUser('u1').then((data) => {

            }).catch(err=>{
                expect(err).toEqual(errMsg);
                expect(Trade.query).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for generateTrade passed successfully***********", () => {
        let dummydata = {
                "shares": "30",
                "symbol": "s2",
                "createdAt": "2018-04-03T13:07:21.010Z",
                "price": "195.65",
                "id": "4",
                "type": "SELL",
                "userid": "u1"
            }
        beforeEach(() => {
            spyOn(Trade, 'create').and.callFake(function(event, callback) {
                callback(null, dummydata)});
        });
        it('should succeed and return generateTrade', (done) => {
            service = new StockMarket();
            service.generateTrade(dummydata).then((data) => {
                expect(data).toEqual(dummydata);
                expect(Trade.create).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for generateTrade return error successfully***********", () => {
        let errmsg = {
            "code":500,
            "status":"error",
            "Message":"Error create Trade"
            }
        beforeEach(() => {
            spyOn(Trade, 'create').and.callFake(function(event, callback) {
                callback(errmsg, null)});
        });
        it('should succeed and return error generateTrade', (done) => {
            service = new StockMarket();
            service.generateTrade({id:"1",userid:"u1"}).then((data) => {

            }).catch(err=>{
                expect(err).toEqual(errmsg);
                expect(Trade.create).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for getTradeByStockType passed successfully***********", () => {
        let dummydata = {
                "shares": "30",
                "symbol": "s2",
                "createdAt": "2018-04-03T13:07:21.010Z",
                "price": "195.65",
                "id": "4",
                "type": "SELL",
                "userid": "u1"
            }
        beforeEach(() => {
            Trade.query = jasmine.createSpy("EventQuery");
            usingIndexSpy = {
                usingIndex: jasmine.createSpy("usingIndex")
            }
            filterSpy = {
                filter: jasmine.createSpy("filter")
            }
            equalsSpy = {
                equals: jasmine.createSpy("equals")
            }
            loadAllSpy = {
                loadAll: jasmine.createSpy("loadAll")
            };
            executionSpy = {
                exec: jasmine.createSpy("exec"),
            };
            Trade.query.and.callFake(() => usingIndexSpy);
            usingIndexSpy.usingIndex.and.callFake(() => filterSpy);
            filterSpy.filter.and.callFake(() => equalsSpy);
            equalsSpy.equals.and.callFake(() => loadAllSpy);
            loadAllSpy.loadAll.and.callFake(() => executionSpy);
            executionSpy.exec.and.callFake(callback => callback(null, dummydata));
        });
        it('should succeed and return getTradeByStockType', (done) => {
            service = new StockMarket();
            service.getTradeByStockType('s3','Buy').then((data) => {
                expect(data).toEqual(dummydata);
                expect(Trade.query).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for getTradeByStockType fail successfully***********", () => {
        let errMsg = {
            message:"Error getting trade by Symbol and Type",
            status:"error",
            code:500
            }
        beforeEach(() => {
            Trade.query = jasmine.createSpy("EventQuery");
            usingIndexSpy = {
                usingIndex: jasmine.createSpy("usingIndex")
            }
            filterSpy = {
                filter: jasmine.createSpy("filter")
            }
            equalsSpy = {
                equals: jasmine.createSpy("equals")
            }
            loadAllSpy = {
                loadAll: jasmine.createSpy("loadAll")
            };
            executionSpy = {
                exec: jasmine.createSpy("exec"),
            };
            Trade.query.and.callFake(() => usingIndexSpy);
            usingIndexSpy.usingIndex.and.callFake(() => filterSpy);
            filterSpy.filter.and.callFake(() => equalsSpy);
            equalsSpy.equals.and.callFake(() => loadAllSpy);
            loadAllSpy.loadAll.and.callFake(() => executionSpy);
            executionSpy.exec.and.callFake(callback => callback(errMsg, null));
        });
        it('should fail and return error getTradeByStockType', (done) => {
            service = new StockMarket();
            service.getTradeByStockType('s3','Buy').then((data) => {
            }).catch(err=>{
                expect(err).toEqual(errMsg);
                expect(Trade.query).toHaveBeenCalled();
                done();
            });
        });
    });
    describe("***********Unit Tests for getStockPrice passed successfully***********", () => {
        let dummydata = {
            "symbol": "s1",
            "month": "4",
            "year": "2018",
            "day": "3",
            "price": "137",
            "timestamp": "2018-04-05T13:07:21.010Z"
        }
        beforeEach(() => {
            Stockprice.query = jasmine.createSpy("EventQuery");
            usingIndexSpy = {
                usingIndex: jasmine.createSpy("usingIndex")
            };
            filterExpressionSpy = {
                filterExpression: jasmine.createSpy("filterExpression")
            };
            expressionAttributeValuesSpy = {
                expressionAttributeValues: jasmine.createSpy("expressionAttributeValues")
            };
            expressionAttributeNamesSpy = {
                expressionAttributeNames:jasmine.createSpy("expressionAttributeNames")
            };
            loadAllSpy = {
                loadAll: jasmine.createSpy("loadAll")
            };
            executionSpy = {
                exec: jasmine.createSpy("exec"),
            };
            Stockprice.query.and.callFake(() => usingIndexSpy);
            usingIndexSpy.usingIndex.and.callFake(() => filterExpressionSpy);
            filterExpressionSpy.filterExpression.and.callFake(() => expressionAttributeValuesSpy);
            expressionAttributeValuesSpy.expressionAttributeValues.and.callFake(() => expressionAttributeNamesSpy);
            expressionAttributeNamesSpy.expressionAttributeNames.and.callFake(()=>loadAllSpy);
            loadAllSpy.loadAll.and.callFake(() => executionSpy);
            executionSpy.exec.and.callFake(callback => callback(null, dummydata));
        });
        it('should pass and return result getStockPrice', (done) => {
            service = new StockMarket();
            service.getStockPrice('s3','2018-01-02','2019-02-17').then((data) => {
                expect(data).toEqual(dummydata);
                expect(Stockprice.query).toHaveBeenCalled();
                done();
            }).catch(err=>{

            });
        });
    });

    describe("***********Unit Tests for getStockPrice fails successfully***********", () => {
        let errMsg = {
            code:500,
            status:'error',
            message:'Error fetching Stock price from DB'
        }
        beforeEach(() => {
            Stockprice.query = jasmine.createSpy("EventQuery");
            usingIndexSpy = {
                usingIndex: jasmine.createSpy("usingIndex")
            };
            filterExpressionSpy = {
                filterExpression: jasmine.createSpy("filterExpression")
            };
            expressionAttributeValuesSpy = {
                expressionAttributeValues: jasmine.createSpy("expressionAttributeValues")
            };
            expressionAttributeNamesSpy = {
                expressionAttributeNames:jasmine.createSpy("expressionAttributeNames")
            };
            loadAllSpy = {
                loadAll: jasmine.createSpy("loadAll")
            };
            executionSpy = {
                exec: jasmine.createSpy("exec"),
            };
            Stockprice.query.and.callFake(() => usingIndexSpy);
            usingIndexSpy.usingIndex.and.callFake(() => filterExpressionSpy);
            filterExpressionSpy.filterExpression.and.callFake(() => expressionAttributeValuesSpy);
            expressionAttributeValuesSpy.expressionAttributeValues.and.callFake(() => expressionAttributeNamesSpy);
            expressionAttributeNamesSpy.expressionAttributeNames.and.callFake(()=>loadAllSpy);
            loadAllSpy.loadAll.and.callFake(() => executionSpy);
            executionSpy.exec.and.callFake(callback => callback(errMsg, null));
        });
        it('should fail and return error getStockPrice', (done) => {
            service = new StockMarket();
            service.getStockPrice('s3','2018-01-02','2019-02-17').then((data) => {

            }).catch(err=>{
                expect(err).toEqual(errMsg);
                expect(Stockprice.query).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for getallTrades passed successfully***********",()=>{
        let dummydata = {
            "Items": [{
                attrs: {
                    "shares": "30",
                    "symbol": "s3",
                    "createdAt": "2018-04-03T13:07:21.010Z",
                    "price": "195.65",
                    "id": "6",
                    "type": "SELL",
                    "userid": "u1"
                }
            },
            {
                attrs: {
                    "shares": "30",
                    "symbol": "s2",
                    "createdAt": "2018-04-03T13:07:21.010Z",
                    "price": "195.65",
                    "id": "4",
                    "type": "SELL",
                    "userid": "u1"
                }
            }],
            "Count": 2,
            "ScannedCount": 2,
            "ConsumedCapacity": null
        }
        service = new StockMarket();
        beforeEach(()=>{
            spyOn(service, 'scanTrade')
            .and
            .returnValue(Promise.resolve(dummydata));
        });
        it('should pass  and return result getallTrades',(done)=>{
            let result = [ { shares: '30',
            symbol: 's2',
            createdAt: '2018-04-03T13:07:21.010Z',
            price: '195.65',
            id: '4',
            type: 'SELL',
            userid: 'u1' },
          { shares: '30',
            symbol: 's3',
            createdAt: '2018-04-03T13:07:21.010Z',
            price: '195.65',
            id: '6',
            type: 'SELL',
            userid: 'u1' } ];

            service.getallTrades().then(data=>{
                expect(data).toEqual(result);
                expect(service.scanTrade).toHaveBeenCalled();
                done()
            });
        });
    });

    describe("***********Unit Tests for getallTrades failed successfully***********",()=>{
        let errMsg = {
            status:'error',
            code:500,
            message:'error getting All trade records'
        }
        service = new StockMarket();
        beforeEach(()=>{
            spyOn(service, 'scanTrade')
            .and
            .returnValue(Promise.reject(errMsg));
        });
        it('should fail  and return error getallTrades',(done)=>{
            service.getallTrades().then(data=>{
            }).catch(err=>{
                expect(err).toEqual(errMsg);
                expect(service.scanTrade).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for createTrade passed successfully***********",()=>{
        let dummydata = {
                    "shares": "30",
                    "symbol": "s3",
                    "createdAt": "2018-04-03T13:07:21.010Z",
                    "price": "195.65",
                    "id": "6",
                    "type": "SELL",
                    "userid": "u1"
                }
        let result = { data:
            { shares: '30',
              symbol: 's3',
              createdAt: '2018-04-03T13:07:21.010Z',
              price: '195.65',
              id: '6',
              type: 'SELL',
              userid: 'u1' },
           code: 201,
           status: 'success' }
        service = new StockMarket();
        beforeEach(()=>{
            spyOn(service, 'getTradeById')
            .and
            .returnValue(Promise.resolve(null));

            spyOn(service, 'getUserById')
            .and
            .returnValue(Promise.resolve('u1'));

            spyOn(service, 'generateTrade')
            .and
            .returnValue(Promise.resolve(dummydata));
        });
        it('should pass  and return result createTrade',(done)=>{
            service.createTrade(dummydata).then(data=>{
                expect(data).toEqual(result);
                expect(service.getTradeById).toHaveBeenCalled();
                expect(service.getUserById).toHaveBeenCalled();
                expect(service.generateTrade).toHaveBeenCalled();
                done()
            });
        });
    });

    describe("***********Unit Tests for createTrade (user dont exist)fail successfully***********",()=>{
        let dummydata = {
                    "shares": "30",
                    "symbol": "s3",
                    "createdAt": "2018-04-03T13:07:21.010Z",
                    "price": "195.65",
                    "id": "6",
                    "type": "SELL",
                    "userid": "u1"
                }
        let result = {
            Type: "Error",
            Message: 'Validation Error: User ID is not valid',
            code: 422
        }
        service = new StockMarket();
        beforeEach(()=>{
            spyOn(service, 'getTradeById')
            .and
            .returnValue(Promise.resolve(null));

            spyOn(service, 'getUserById')
            .and
            .returnValue(Promise.resolve(null));

            spyOn(service, 'generateTrade')
            .and
            .returnValue(Promise.resolve(dummydata));
        });
        it('should  return message user dont exist createTrade',(done)=>{
            service.createTrade(dummydata).then(data=>{
                expect(data).toEqual(result);
                expect(service.getTradeById).toHaveBeenCalled();
                expect(service.getUserById).toHaveBeenCalled();
                expect(service.generateTrade).not.toHaveBeenCalled();
                done()
            });
        });
    });

    describe("***********Unit Tests for createTrade (duplicate Trade ID)fail successfully***********",()=>{
        let dummydata = {
                    "shares": "30",
                    "symbol": "s3",
                    "createdAt": "2018-04-03T13:07:21.010Z",
                    "price": "195.65",
                    "id": "6",
                    "type": "SELL",
                    "userid": "u1"
                }
        let result = {
            Type: "Error",
            Message: 'Duplicate Error : Trade ID already Exist.',
            code: 400
        }
        service = new StockMarket();
        beforeEach(()=>{
            spyOn(service, 'getTradeById')
            .and
            .returnValue(Promise.resolve('data'));

            spyOn(service, 'getUserById')
            .and
            .returnValue(Promise.resolve(null));

            spyOn(service, 'generateTrade')
            .and
            .returnValue(Promise.resolve(dummydata));
        });
        it('should return message duplicate userID result createTrade',(done)=>{
            service.createTrade(dummydata).then(data=>{
                expect(data).toEqual(result);
                expect(service.getTradeById).toHaveBeenCalled();
                expect(service.getUserById).not.toHaveBeenCalled();
                expect(service.generateTrade).not.toHaveBeenCalled();
                done()
            });
        });
    });

    describe("***********Unit Tests for createTrade failed successfully***********",()=>{
        let dummydata = {
            "shares": "30",
            "symbol": "s3",
            "createdAt": "2018-04-03T13:07:21.010Z",
            "price": "195.65",
            "id": "6",
            "type": "SELL",
            "userid": "u1"
        }

        let errMsg = {
            status:'error',
            code:500,
            message:'error getting All trade records'
        }
        service = new StockMarket();
        beforeEach(()=>{
            spyOn(service, 'getTradeById')
            .and
            .returnValue(Promise.resolve(null));

            spyOn(service, 'getUserById')
            .and
            .returnValue(Promise.resolve('u1'));

            spyOn(service, 'generateTrade')
            .and
            .returnValue(Promise.reject(errMsg));
        });
        it('should fail  and return error createTrade',(done)=>{
            service.createTrade(dummydata).then(data=>{
            }).catch(err=>{
                expect(err).toEqual(errMsg);
                expect(service.getUserById).toHaveBeenCalled();
                expect(service.getTradeById).toHaveBeenCalled();
                expect(service.generateTrade).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("***********Unit Tests for getTradeReportByUser passed successfully***********",()=>{
        let dummydata = {
            "Items": [{
                attrs: {
                    "shares": "30",
                    "symbol": "s3",
                    "createdAt": "2018-04-03T13:07:21.010Z",
                    "price": "195.65",
                    "id": "6",
                    "type": "SELL",
                    "userid": "u1"
                }
            },
            {
                attrs: {
                    "shares": "30",
                    "symbol": "s2",
                    "createdAt": "2018-04-03T13:07:21.010Z",
                    "price": "195.65",
                    "id": "4",
                    "type": "SELL",
                    "userid": "u1"
                }
            }],
            "Count": 2,
            "ScannedCount": 2,
            "ConsumedCapacity": null
        }

        let result = { data:
            [ { shares: '30',
                symbol: 's2',
                createdAt: '2018-04-03T13:07:21.010Z',
                price: '195.65',
                id: '4',
                type: 'SELL',
                userid: 'u1' },
              { shares: '30',
                symbol: 's3',
                createdAt: '2018-04-03T13:07:21.010Z',
                price: '195.65',
                id: '6',
                type: 'SELL',
                userid: 'u1' } ],
           code: 200,
           status: 'success' }

        service = new StockMarket();
        beforeEach(()=>{
            spyOn(service, 'getUserById')
            .and
            .returnValue(Promise.resolve('u1'));

            spyOn(service, 'getTradeByUser')
            .and
            .returnValue(Promise.resolve(dummydata));
        });
        it('should pass and return result getTradeReportByUser',(done)=>{
            service.getTradeReportByUser('u1').then(data=>{
                expect(data).toEqual(result);
                expect(service.getUserById).toHaveBeenCalled();
                expect(service.getTradeByUser).toHaveBeenCalled();
                done();
            }).catch(err=>{

            });
        });
    });

    describe("***********Unit Tests for getTradeReportByUser(no user exist) return message successfully***********",()=>{
        let dummydata = {
            "Items": [{
                attrs: {
                    "shares": "30",
                    "symbol": "s3",
                    "createdAt": "2018-04-03T13:07:21.010Z",
                    "price": "195.65",
                    "id": "6",
                    "type": "SELL",
                    "userid": "u1"
                }
            },
            {
                attrs: {
                    "shares": "30",
                    "symbol": "s2",
                    "createdAt": "2018-04-03T13:07:21.010Z",
                    "price": "195.65",
                    "id": "4",
                    "type": "SELL",
                    "userid": "u1"
                }
            }],
            "Count": 2,
            "ScannedCount": 2,
            "ConsumedCapacity": null
        }

        let errMsg = {
            Type: "Error",
            Message: 'Validation Error: User ID does not Exist',
            code: 404
        }

        service = new StockMarket();
        beforeEach(()=>{
            spyOn(service, 'getUserById')
            .and
            .returnValue(Promise.resolve(null));

            spyOn(service, 'getTradeByUser')
            .and
            .returnValue(Promise.resolve(dummydata));
        });
        it('should pass and return result getTradeReportByUser',(done)=>{
            service.getTradeReportByUser('u1').then(data=>{
                expect(data).toEqual(errMsg);
                expect(service.getUserById).toHaveBeenCalled();
                expect(service.getTradeByUser).not.toHaveBeenCalled();
                done();
            }).catch(err=>{

            });
        });
    });

    describe("***********Unit Tests for getTradeReportByUser fail successfully***********",()=>{

        let errMsg = {
            Type: "Error",
            Message: 'Error fetching reports by User',
            code: 404
        }

        service = new StockMarket();
        beforeEach(()=>{
            spyOn(service, 'getUserById')
            .and
            .returnValue(Promise.resolve('u1'));

            spyOn(service, 'getTradeByUser')
            .and
            .returnValue(Promise.reject(errMsg));
        });
        it('should pass and return result getTradeReportByUser',(done)=>{
            service.getTradeReportByUser('u1').then(data=>{
            }).catch(err=>{
                expect(err).toEqual(errMsg);
                expect(service.getUserById).toHaveBeenCalled();
                expect(service.getTradeByUser).toHaveBeenCalled();
                done();
            });
        });
    });
    describe("***********Unit Tests for getTradeReportByUser (no trades user ID)passed successfully***********",()=>{
        let dummydata = {
            "Items": [],
            "Count": 0,
            "ScannedCount": 2,
            "ConsumedCapacity": null
        }

        let result = {
            Message: 'User has not conducted any trades',
            code: 200,
            status: 'success'
        }

        service = new StockMarket();
        beforeEach(()=>{
            spyOn(service, 'getUserById')
            .and
            .returnValue(Promise.resolve('u1'));

            spyOn(service, 'getTradeByUser')
            .and
            .returnValue(Promise.resolve(dummydata));
        });
        it('should pass and return result getTradeReportByUser',(done)=>{
            service.getTradeReportByUser('u1').then(data=>{
                expect(data).toEqual(result);
                expect(service.getUserById).toHaveBeenCalled();
                expect(service.getTradeByUser).toHaveBeenCalled();
                done();
            }).catch(err=>{

            });
        });
    });
});