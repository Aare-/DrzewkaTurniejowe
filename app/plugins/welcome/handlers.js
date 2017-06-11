'use strict';

function display_hello_world(options) {
    return function (request, reply) {
        reply.view('hello_world');
    };
}

module.exports.display_hello_world = display_hello_world;