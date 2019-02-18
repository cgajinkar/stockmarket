var dynogels = require('dynogels');
var Joi = require('joi');

const HASHKEYID = 'id';
const DataSchema = {
    id: Joi.string(),
    name: Joi.string()
}
const User = dynogels.define('User', {
    hashKey: HASHKEYID,
    timestamps: true,
    schema: DataSchema,
    tableName: 'User'
});
module.exports={User};