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
                console.log(data)
                expect(data).toEqual(dummydata);
                expect(Trade.scan).toHaveBeenCalled();
                done();
            })
        });
    });

    describe("***********Unit Tests for scanTrade passed successfully***********", () => {
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
                console.log(err)
                expect(err).toEqual(errmsg);
                expect(Trade.scan).toHaveBeenCalled();
                done();
            })
        });
    });
});