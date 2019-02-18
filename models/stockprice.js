var dynogels = require('dynogels');
var Joi = require('joi');

const HASHKEYID = 'timestamp';
const DataSchema = {
    timestamp:Joi.date(),
    symbol:Joi.string(),
    price: Joi.number().precision(2).min(130.42).max(195.65),
    year:Joi.number(),
    month:Joi.number(),
    day:Joi.number()
}
const Stockprice = dynogels.define('Stockprice', {
    hashKey: HASHKEYID,
    indexes : [{
        hashKey : 'symbol', name : 'symbol-index', type : 'global'
      }],
    schema: DataSchema,
    tableName: 'Stockprice'
});
module.exports={Stockprice};