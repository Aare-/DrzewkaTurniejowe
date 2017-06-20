'use strict';

var Boom = require('boom');
var Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = function (mongoose) {
  var modelName = 'Tree';
  var Types = mongoose.Schema.Types;
    
  var Schema = new mongoose.Schema({
      
    TreeName: {
        type: Types.String,
        required: true,
        unique: true
    },

    Owner: {
        type: Types.String,
        required: true
    },

      /*
       * MongoDB automatically created _id fields for each element in subarray
       * we use this _id field to reference participants from tree nodes
       */
    Participants: [ {
        DisplayName: {
            type: Types.String,
        },

        EmailAddress: {
            type: Types.String,
            required: true,
            unique: true
        },

    }],

    TreeNodes: [ {

        Player1_id: {
            type: Types.String,
        },

        Player2_id: {
            type: Types.String,
        },

        /*
            0 - undecided
            1 - player 1 won
            2 - player 2 won
         */
        Result: {
            type: Types.Number,
            default: 0
        },

        Note: {
            type: Types.String
        },

        /*
         * _id of the next node.
         *  Last node has this set to empty string
         */
        NextTreeNode_id: {
            type: Types.String
        }

    } ]
        
  });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
        extraEndpoints: [

            // result set endpoint
            function (server, model, options, Log) {
                const Tree = model;

                const set_result_handler = function(request, reply) {

                    console.log("updating!");

                    Tree.findOneAndUpdate(
                        {
                            _id : request.params._id,
                            "TreeNodes._id" : request.params._id_node
                        },
                        {
                            $set: {
                                "TreeNodes.$.Result" : request.payload.Result,
                                "TreeNodes.$.Note" : request.payload.Note,
                            }
                        })
                        .then(function(result) {
                            console.log(" - Done! result: "+result);

                            reply();
                        })
                        .catch(function(error) {
                            return reply(Boom.badImplementation('There was an error accessing the database.'));
                        });
                };

                server.route({
                    method: 'PUT',
                    path: '/Tree/{_id}/Node/{_id_node}/SetResult',
                    config: {
                        handler: set_result_handler,
                        auth: null,
                        description: 'Set match result',
                        tags: ['api'],
                        validate: {
                            params: {
                                _id:
                                    Joi.objectId()
                                        .required(),

                                _id_node:
                                    Joi.objectId()
                                        .required(),
                            },
                            payload: {
                                Result:
                                    Joi.number()
                                       .required()
                                       .integer()
                                       .greater(-1)
                                       .less(3)
                                       .description("Result of the match where 0 is undecided, 1 is player 1 won, 2 is player 2 won"),

                                Note:
                                    Joi.string()
                                        .max(128)
                                        .truncate()
                                        .description("Optional note - max 128 characters"),
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

            // add participant to the tree
            function (server, model, options, Log) {
                const Tree = model;

                const add_participant_handler = function(request, reply) {
                    console.log("Adding participant to tree: "+request.params._id);

                    Tree.findOneAndUpdate(
                            { _id : request.params._id},
                            { $push: { Participants : request.payload }} )
                        .then(function(result) {
                            console.log(" - Done!");

                            reply();
                        })
                        .catch(function(error) {
                            return reply(Boom.badImplementation('There was an error accessing the database.'));
                        });
                };

                server.route({
                    method: 'POST',
                    path: '/Tree/{_id}/AddParticipant',
                    config: {
                        handler: add_participant_handler,
                        auth: null,
                        description: 'Adds Participant',
                        tags: ['api'],
                        validate: {
                            params: {
                                _id: Joi
                                    .objectId()
                                    .required()
                            },
                            payload: {
                                DisplayName:
                                    Joi.string()
                                       .required()
                                       .description("Nickname of the participant"),

                                EmailAddress:
                                    Joi.string()
                                       .email()
                                       .required()
                                       .description("Email adress of the participant")

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

            // delete participant from the tree
            function (server, model, options, Log) {
                const Tree = model;

                const del_participant_handler = function(request, reply) {
                    reply();
                };

                server.route({
                    method: 'DELETE',
                    path: '/Tree/{_id}/Participant/{_email}',
                    config: {
                        handler: del_participant_handler,
                        auth: null,
                        description: 'Deletes Participant',
                        tags: ['api'],
                        validate: {
                            params: {
                                _id: Joi
                                    .objectId()
                                    .required(),
                                _email: Joi
                                    .string()
                                    .email()
                                    .required()
                                    .description("Email adress of the participant")
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

            // generate tree nodes
            function (server, model, options, Log) {
                const Tree = model;

                const build_tree = function(request, reply) {
                    reply();
                };

                server.route({
                    method: 'PUT',
                    path: '/Tree/{_id}/Build',
                    config: {
                        handler: build_tree,
                        auth: null,
                        description: 'Builds tree based on set of participants. Deletes all previous tree data!',
                        tags: ['api'],
                        validate: {
                            params: {
                                _id: Joi
                                    .objectId()
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

            // get tree nodes
            function (server, model, options, Log) {
                const Tree = model;

                const get_nodes = function(request, reply) {
                    Tree.findOne( { _id : request.params._id } )
                        .then(function(result) {
                            reply(result.TreeNodes);
                        })
                        .catch(function(error) {
                            return reply(Boom.badImplementation('There was an error accessing the database.'));
                        });
                };

                server.route({
                    method: 'GET',
                    path: '/Tree/{_id}/Nodes',
                    config: {
                        handler: get_nodes,
                        auth: null,
                        description: 'Returns nodes of the given tree',
                        tags: ['api'],
                        validate: {
                            params: {
                                _id: Joi
                                    .objectId()
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
            }
        ]

    }
  };

  return Schema;
};