'use strict';

exports.register = 
    function (server, options, next) {       
        
        var routes = require('./routes.js') (options);
        server.route(routes);

        next();
    };

exports.register.attributes = {
    name: 'Tournament Tree Welcome',
    version: '1.0.0'
};