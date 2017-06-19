'use strict';

// libraries
const Hapi = require('hapi');
const Pug = require('pug');
const Server = new Hapi.Server();
const Mongoose = require('mongoose');
const Inert = require('inert');
const RestHapi = require('rest-hapi');

// plugins
const Welcome = require('./app/plugins/welcome');

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
        // lib plugins
         { 
           register: Inert
         },
         
         { 
           register: RestHapi,
           options: { mongoose: Mongoose },
           routes: { prefix: '/rest' }
         },
           
        // my plugins
         { 
           register: Welcome,
           options: { mongoose: Mongoose }
         }      
        ],
    
        (err) => {
            if (err) throw err;                        
            
            appServer.route(require('./config/routes_public.js'));            
            appServer.views({
                engines: {pug: Pug},
                path: __dirname + '/app/templates',                                
                compileOptions: {
                    basedir: __dirname + '/app/templates', 
                    pretty: true},
                runtimeOptions: {
                    basedir: __dirname + '/app/templates'
                }
            });
            
            Server.start((err) => {
                if (err) throw err;
                console.log(`App server running at: ${appServer.info.uri}`);
            });           
        }    
    );