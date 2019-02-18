var dynogels = require('dynogels');
var Joi = require('joi');

const HASHKEYID = 'id';
// const UserSchema ={
//     userid: Joi.string(),
//     name: Joi.string()
// }
const DataSchema = {
    id: Joi.number(),
    type: Joi.string(),
    userid: Joi.string(),
    symbol: Joi.string(),
    shares: Joi.number().integer().min(10).max(30),
    price: Joi.number().precision(2).min(130.42).max(195.65)
}
const Trade = dynogels.define('Trade', {
    hashKey: HASHKEYID,
    indexes : [{
        hashKey : 'symbol', name : 'symbol-index', type : 'global'
      },
      {
        hashKey : 'userid', name : 'userid-index', type : 'global'
      }],
    timestamps: true,
    schema: DataSchema,
    tableName: 'Trade'
});

module.exports={Trade};