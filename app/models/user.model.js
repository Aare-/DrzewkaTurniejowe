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
        routeOptions: {
            extraEndpoints: [
                // find by email
                function (server, model, options, Log) {
                    const User = model;

                    const log_in_handler = function(request, reply) {
                        User.findOne( { Email: request.params._email} )
                            .then(function(response) {
                                return reply(response);
                            })
                            .catch(function(error) {
                                return reply(Boom.badImplementation('There was an error accessing the database.'));
                            });
                    };

                    server.route({
                        method: 'GET',
                        path: '/User/Email/{_email}',
                        config: {
                            handler: log_in_handler,
                            auth: null,
                            description: 'Get user by his email',
                            tags: ['api'],
                            validate: {
                                params: {
                                    _email: Joi
                                        .string()
                                        .email()
                                        .required(),
                                }
                            }
                        }
                    });

                },
            ]
            /*extraEndpoints: [

                // log in
                function (server, model, options, Log) {

                    const log_in_handler = function(request, reply) {
                        Boom.unauthorized("All shall be unauthorised until implemented properly!");
                    };

                    server.route({
                        method: 'POST',
                        path: '/LogIn',
                        config: {
                            handler: log_in_handler,
                            auth: null,
                            description: 'LogIn given user',
                            tags: ['api'],
                            validate: {
                                payload: {
                                    Email: Joi
                                        .string()
                                        .email()
                                        .required(),
                                    Password: Joi
                                        .string()
                                        .min(2)
                                        .max(200)
                                        .required()
                                }
                            },
                            plugins: {
                                'hapi-swagger': {
                                    responseMessages: [
                                        {code: 200, message: 'Success'},
                                        {code: 400, message: 'Bad Request'},
                                        {code: 404, message: 'Not Found'},
                                        {code: 500, message: 'Internal Server Error'}
                                    ]
                                }
                            }
                        }
                    });

                },

                // log out
                function (server, model, options, Log) {

                    const log_out_handler = function(request, reply) {
                        request.auth.session.clear();
                        reply();
                    };

                    server.route({
                        method: 'GET',
                        path: '/LogOut',
                        config: {
                            handler: log_out_handler,
                            description: "LogOut current user",
                            tags: ['api']
                        }
                    });

                }

            ]
            */
        }
    };

    return Schema;
};