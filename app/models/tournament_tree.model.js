'use strict';

module.exports = function (mongoose) {
  var modelName = 'Tree';
  var Types = mongoose.Schema.Types;
    
  var Schema = new mongoose.Schema({
      
    Name: {
        type: Types.String,
        required: true,
        unique: true
    },                               
    
        
  });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {}
  };
  
  return Schema;
};