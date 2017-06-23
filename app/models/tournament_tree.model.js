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
        required: true
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
            type: Types.String
        },

        EmailAddress: {
            type: Types.String
        }

    }],

    TreeNodes: [ {

        NodePos : {
            type: Types.Number
        },

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

                    Tree.findOneAndUpdate(
                        {
                            _id : request.params._id,
                            "TreeNodes._id" : request.params._id_node
                        },
                        {
                            $set: {
                                "TreeNodes.$.Result" : request.payload.Result,
                            }
                        })
                        .then(function(result) {
                            return Tree.find(
                                {
                                    _id : request.params._id,
                                },
                                {
                                    TreeNodes: { $elemMatch: { '_id': request.params._id_node} }
                                });
                        })
                        .then(function(result) {
                            if(result[0].TreeNodes[0].NextTreeNode_id === 0) {
                                return reply();
                            }

                            let winnerId = null;

                            if(request.payload.Result === 1) {
                                winnerId = result[0].TreeNodes[0].Player1_id;

                            } else if (request.payload.Result === 2) {
                                winnerId = result[0].TreeNodes[0].Player2_id;
                            }

                            if(result[0].TreeNodes[0].NodePos % 2 === 0) {
                                return Tree.findOneAndUpdate(
                                    {   _id : request.params._id,
                                        "TreeNodes._id" : result[0].TreeNodes[0].NextTreeNode_id },
                                    {
                                        $set : { "TreeNodes.$.Player1_id" : winnerId }
                                    });
                            } else {
                                return Tree.findOneAndUpdate(
                                    {   _id : request.params._id,
                                        "TreeNodes._id" : result[0].TreeNodes[0].NextTreeNode_id },
                                    {
                                        $set : { "TreeNodes.$.Player2_id" : winnerId }
                                    });
                            }
                        })
                        .then(function(result) {
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

                    Tree.findOneAndUpdate(
                        { _id : request.params._id,
                          'Participants.EmailAddress': { $ne: request.payload.EmailAddress } },
                        { $push: { Participants : request.payload }} )
                        .then(function(result) {
                            if(result == null)
                                return reply(Boom.conflict("Duplicate email adress"));

                            reply();
                        })
                        .catch(function(error) {
                            console.log("ERR: "+error);
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
                    Tree.findOneAndUpdate(
                        { _id: request.params._id },
                        { $pull: {
                            Participants : { EmailAddress : request.params._email }
                        }})
                        .then(function(result) {
                            reply();
                        })
                        .catch(function(error) {
                            return reply(Boom.badImplementation('There was an error accessing the database.'));
                        });
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
                    var base_tree_level = new Array();
                    var treeId = { _id : request.params._id };
                    var pLength;

                    Tree.findOneAndUpdate(
                        treeId,
                        { $set : { TreeNodes : [] }})
                        .then(function(result) {
                            var participants = result.Participants.slice();

                            // shuffling the array of participants
                            for (var i = participants.length - 1; i > 0; i--) {
                                var j = Math.floor(Math.random() * (i + 1));
                                var temp = participants[i];
                                participants[i] = participants[j];
                                participants[j] = temp;
                            }

                            pLength = participants.length;
                            var tmp = 1;
                            while(tmp < pLength)
                                tmp *= 2;
                            pLength = tmp;
                            var nodeCounter = 0;

                            for(var i = 0; i < pLength; i+= 2) {
                                var playerId1 = null;
                                var playerId2 = null;
                                var result = 1;

                                // when enough participants, add new node
                                if (i < participants.length) {
                                    playerId1 = participants[ i ]._id;
                                    result = 1;
                                }
                                if(i + 1 < participants.length) {
                                    playerId2 = participants[ i + 1 ]._id;
                                    result = 0;
                                }

                                base_tree_level.push({
                                    NodePos: nodeCounter,
                                    Player1_id : playerId1,
                                    Player2_id : playerId2,
                                    Result: result,
                                    NextTreeNode_id: 0
                                });

                                nodeCounter++;
                            }

                            let emptyNodes = new Array();
                            for(let i = 0; i < base_tree_level.length - 1; i++) {
                                emptyNodes.push({
                                    NodePos: nodeCounter,
                                    Player1_id: null,
                                    Player2_id: null,
                                    Result: 0
                                })
                                nodeCounter++;
                            }

                            //update empty nodes to automatically has the correct player set
                            for(let i = 0; i < base_tree_level.length; i++)
                                if(base_tree_level[i].Result === 1)
                                    if(base_tree_level[i].NodePos % 2 === 0) {
                                        emptyNodes[Math.floor(i / 2)].Player1_id =
                                            base_tree_level[i].Player1_id;
                                    } else {
                                        emptyNodes[Math.floor(i / 2)].Player2_id =
                                            base_tree_level[i].Player1_id;
                                    }

                            return Tree.findOneAndUpdate(
                                treeId,
                                {
                                    $push : {
                                        TreeNodes : { $each: base_tree_level.concat(emptyNodes) }
                                    }
                                }
                            )
                        }).then(function(result) {
                            return Tree.findOne(treeId);
                        }).then(function(result) {

                            var tLen = 0;
                            var cLen = pLength / 2;
                            var setObj = {};

                            while(cLen > 1) {
                                for (var i = 0; i < cLen; i++) {
                                    var pos = i + tLen;
                                    var refPos = tLen + cLen + Math.floor(i / 2);

                                    setObj["TreeNodes."+pos+".NextTreeNode_id"] = result.TreeNodes[refPos]._id;
                                }

                                tLen += cLen;
                                cLen = cLen / 2;
                            }

                            return Tree.findOneAndUpdate(
                                treeId,
                                { $set: setObj });
                        }).then(function(result) {
                            reply();
                        })
                        .catch(function(err) {
                            return reply(Boom.badImplementation('There was an error accessing the database. '));
                        });
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
            },

            // get all trees that belong to user
            function (server, model, options, Log) {
                const Tree = model;

                const get_nodes = function(request, reply) {
                    Tree.find(
                        { Owner : request.params._id }
                        )
                        .then(function(result) {
                            reply(result);
                        })
                        .catch(function(error) {
                            return reply(Boom.badImplementation('There was an error accessing the database.'));
                        });
                };

                server.route({
                    method: 'GET',
                    path: '/Tree/User/{_id}',
                    config: {
                        handler: get_nodes,
                        auth: null,
                        description: 'Returns trees that belong to the given user',
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