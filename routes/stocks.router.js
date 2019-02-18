var express = require('express');
const url = require('url');
const { StockMarket } = require('../services/stock.service');
const { OK } = require('../lib/http-response');
var router = express.Router();
router.delete('/erase', function (req, res) {
    console.log('Delete');
    let smobj = new StockMarket();
    smobj.emptyTable()
        .then(
            () =>res.send({
                Message: " Table Cleared Successfully",
                status: "success",
                code: 200 }))
        
        .catch(
            err => res.send({
                Message: "Error deleting table", 
                status: "error", 
                code: 500 }));
});

router.post('/trades', function (req, res) {
    let body = req.body;
    let smobj = new StockMarket();
    smobj.createTrade(body).then(val => {
        res.send(val);
    }).catch(error => {
        res.status(404)
            .send(error);
    });
});


router.get('/trades', function (req, res) {
    let smobj = new StockMarket();
    smobj.getallTrades().then(data => {
        res.send(OK(data));
    }).catch(error => {
        res.status(404)
            .send({ Message: "Error fetching Traded list." });
    });
});

router.get('/trades/users/:userID', function (req, res) {
    let smobj = new StockMarket();
    smobj.getTradeReportByUser(req.params.userID).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(404)
            .send({ Message: "Error fetching Traded records" });
    });
});

router.get('/stocks/:stockSymbol/trades', function (req, res) {
    let symbol = req.params.stockSymbol;
    let type = req.query.type;
    let start = req.query.start;
    let end = req.query.end;
    let smobj = new StockMarket();
    smobj.getReportByTypeAndStock(symbol,type,start,end).then(data=>{
        res.send(data);
    }).catch(error=>{
        res.status(404)
        .send({ Message: "Error fetching Traded records" });
    });
});

router.get('/stocks/:stockSymbol/price', function (req, res) {
    let symbol = req.params.stockSymbol;
    let start = req.query.start;
    let end = req.query.end;
    let smobj = new StockMarket();
    smobj.getStockHighLow(symbol,start,end).then(data=>{
        res.send(data);
    }).catch(error=>{
        res.status(404)
        .send({ Message: "Error fetching Traded records" });
    });
});
module.exports = router;