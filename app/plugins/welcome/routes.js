'use strict';

const Handlers = require('./handlers.js');

module.exports = function(options) {
    return [        
        {
            path: '/',
            method: 'GET',
            handler: Handlers.display_hello_world(options)
        }
    ]
};