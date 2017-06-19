'use strict';

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
    routeOptions: {}
  };
  
  return Schema;
};