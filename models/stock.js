var dynogels = require('dynogels');
var Joi = require('joi');

const HASHKEYID = 'symbol';
const DataSchema = {
    name: Joi.string(),
    symbol: Joi.string()
}
const Stock = dynogels.define('Stock', {
    hashKey: HASHKEYID,
    timestamps: true,
    schema: DataSchema,
    tableName: 'Stock'
});

module.exports={Stock};