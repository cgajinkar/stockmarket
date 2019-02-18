var dynogels = require('dynogels');
const { Stock } = require('../models/stock');
const { Stockprice } = require('../models/stockprice');
const { Trade } = require('../models/trade');
const { User } = require('../models/user');
const stock = require('./stock.json');
const stockprice = require('./stockprice.json');
const trade = require('./trade.json');
const user = require('./user.json');
const AWS = dynogels.AWS;
const config = {
    region: process.env.region,
    endpoint: process.env.dynogels_endpoint,
    accessKeyId: process.env.dynogels_accessKey,
    secretAccessKey: process.env.dynogels_accessSecret
};
AWS.config.update(config);
const dynamodb = new AWS.DynamoDB();

dynogels.dynamoDriver(
    new AWS.DynamoDB({
        region: process.env.region,
        endpoint: process.env.dynogels_endpoint,
        accessKeyId: process.env.dynogels_accessKey,
        secretAccessKey: process.env.dynogels_accessSecret
    })
);

const listTables = () => {
    dynamodb.listTables(function(err, data) {
      if (err){
        console.log(err, err.stack); // an error occurred
      }else {
          console.log(data); // successful response
      }
    });
  };

const createTables = () => {
    dynogels.createTables(createError => {
        if (createError) {
            console.log('Error Creating Tables: ', createError);
        } else {
            console.log('Table has been created');
            Stock.create(stock, (saveError, interests) => {
                if (saveError) {
                  console.log("Error loading stock seed data", saveError);
                } else {
                  console.log("stock: " + stock.length + " items");
                }
              });
              Stockprice.create(stockprice, (saveError, interests) => {
                if (saveError) {
                  console.log("Error loading stockPrice seed data", saveError);
                } else {
                  console.log("Stockprice: " + stockprice.length + " items");
                }
              });
              User.create(user, (saveError, interests) => {
                if (saveError) {
                  console.log("Error loading user seed data", saveError);
                } else {
                  console.log("User: " + user.length + " items");
                }
              });
              Trade.create(trade, (saveError, interests) => {
                if (saveError) {
                  console.log("Error loading trade seed data", saveError);
                } else {
                  console.log("Trade: " + trade.length + " items");
                }
              });
        }
    });
}

createTables();