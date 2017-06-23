/**
 * Created by fblos_000 on 19.06.2017.
 */

var Boom = require('boom');
var Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


module.exports = function (mongoose) {
    var modelName = 'User';
    var Types = mongoose.Schema.Types;

    var Schema = new mongoose.Schema({

        Email: {
            type: Types.String,
            required: true,
        },

        Password: {
            type: Types.String,
            required: true
        }

    });

    Schema.statics = {
        collectionName: modelName,
        routeOptions: {}
    };

    return Schema;
};