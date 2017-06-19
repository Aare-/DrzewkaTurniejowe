'use strict';

// libraries
const Hapi = require('hapi');
const Server = new Hapi.Server();
const Mongoose = require('mongoose');
const RestHapi = require('rest-hapi');
const Good = require('good');
const AngularQuickstart = require('./angular-quickstart');

Mongoose
    .connection
    .on('error', console.error.bind(console, 'connection error:'));
Mongoose
    .connection
    .once('open', function() {
        console.log('Connected to the database!');
    });

Server.connection({
    port: 3000,
    host: 'localhost',
		router:{stripTrailingSlash: true},
    labels: ['app'] });

RestHapi.config = {
    appTitle: "Drzewka Turniejowe",
    docExpansion: 'list',
    absluteModelPath: true,
    modelPath: './app/models',
    mongo: {URI: 'mongodb://localhost:27017/test'}
};

var appServer = Server.select('app');

appServer
    .register(
        [

        //angular2:
        {
          register: Good,
          options: {
            ops: { interval: 600000 },
            reporters: {
              console: [
                { module: 'good-console'}, 'stdout'
              ]
            }
          }},

         {
           register: RestHapi,
           options: { mongoose: Mongoose },
           routes: { prefix: '/rest' }
         },

        // my plugins
            {
            register: AngularQuickstart
            }
        ],

        (err) => {
            if (err) throw err;

            appServer.route(require('./config/routes_public.js'));

            Server.start((err) => {
                if (err) throw err;
                console.log(`App server running at: ${appServer.info.uri}`);
            });
        }
    );
