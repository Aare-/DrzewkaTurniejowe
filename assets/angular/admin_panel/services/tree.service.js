"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/observable/fromPromise');
const SampleTree = {
    TreeName: "tree_0",
    Participants: "participants",
    TreeNodes: "nodes",
    _id: "0",
    createdAt: new Date("2017-06-18"),
    updatedAt: new Date("2017-06-18")
};
const SampleTreeList = [
    {
        TreeName: "tree_0",
        Participants: "participants",
        TreeNodes: "nodes",
        _id: "0",
        createdAt: new Date("2017-06-18"),
        updatedAt: new Date("2017-06-18")
    },
    {
        TreeName: "tree_1",
        Participants: "participants",
        TreeNodes: "nodes",
        _id: "1",
        createdAt: new Date("2017-06-18"),
        updatedAt: new Date("2017-06-18")
    },
];
const SampleError = {
    statusCode: 400,
    error: "Bad Request",
    message: ["sample_err_message "],
    validation: {
        source: "payload",
        keys: [
            "value"
        ]
    }
};
let TreeService = class TreeService {
    //!!!!!!!
    //api is incomplete
    //loging/authentication api will be in separate service
    //currently we have problems with database, as it teoertically exists, it only spews errors. Its not my problem - ill have to inform about it, and work around it.
    //so this service will be acting as a stub
    constructor(http) {
        this.http = http;
    }
    //function simulating server randomly answering calls. returns an Observable with 90% chance of resolving and 10% rejecting in 50 miliseconds
    randomServerAnswer(res, rej) {
        let p = new Promise((resolve, reject) => {
            let chance = Math.random();
            if (chance < 0.9) {
                setTimeout(() => { resolve(res); }, 50);
            }
            else {
                setTimeout(() => { reject(rej); }, 50);
            }
        });
        return p;
    }
    //generally this should be handling promises or sumthin'
    // Get all Trees from the API
    getTree() {
        //return this.http.get('/rest/Tree');
        return this.randomServerAnswer(SampleTreeList, SampleError);
    }
    //deletes one or more trees from API
    deleteTree(tree) {
        //return this.http.delete('/rest/Tree');
        return this.randomServerAnswer(SampleTreeList, SampleError);
    }
    //deletes one or more trees from API
    postTree(tree) {
        //return this.http.post('/rest/Tree');
        return this.randomServerAnswer(SampleTreeList, SampleError);
    }
    // Get Tree by ID
    getTreeID(id) {
        //return this.http.get('/rest/Tree/'+id);
        return this.randomServerAnswer(SampleTree, SampleError);
    }
    //deletes one or more trees from API
    deleteTreeID(id) {
        //return this.http.delete('/rest/Tree/'+id);
        return this.randomServerAnswer(SampleTree, SampleError);
    }
    //deletes one or more trees from API
    postTreeID(id) {
        //return this.http.post('/rest/Tree/'+id);
        return this.randomServerAnswer(SampleTree, SampleError);
    }
};
TreeService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], TreeService);
exports.TreeService = TreeService;
//# sourceMappingURL=tree.service.js.map