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
require('rxjs/add/operator/catch');
const http_2 = require('@angular/http');
const http_3 = require('@angular/http');
const Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/throw');
let TreeService = class TreeService {
    //!!!!!!!
    //api is incomplete
    //loging/authentication api will be in separate service
    //currently we have problems with database, as it teoertically exists, it only spews errors. Its not my problem - ill have to inform about it, and work around it.
    //so this service will be acting as a stub
    constructor(http) {
        this.http = http;
    }
    //helper method, for extracting data in response._body.docs
    extractData(res) {
        console.log(res.json());
        let body = res.json();
        return body || {};
    }
    //helper method
    handleError(error) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg;
        if (error instanceof http_1.Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    }
    // Get all Trees from the API
    getTree() {
        //return this.http.get('/rest/Tree');
        return this.http.get('/rest/Tree')
            .map(this.extractData)
            .catch(this.handleError);
    }
    // post new tree to the API. tree cant have id, createdAt and updatedAt
    postTree(tree) {
        let headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        let options = new http_2.RequestOptions({ headers: headers });
        return this.http.post('/rest/Tree', tree, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //Get tree given it's id string
    getTreeById(treeId) {
        //return this.http.get('/rest/Tree');
        return this.http.get('/rest/Tree/' + treeId)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getTreesByParam(numPerPage, pageNum, owner = "") {
        let options = new http_2.RequestOptions({ headers: new http_2.Headers({ 'Content-Type': 'application/json' }) });
        let params = new http_3.URLSearchParams;
        options.search = params;
        params.set("$page", pageNum.toString());
        params.set("$limit", numPerPage.toString());
        params.set("$sort", "-createdAt");
        if (owner) {
            params.set("Owner", owner);
        }
        let p = new Promise((res, rej) => {
            this.http.get('/rest/Tree', options).toPromise()
                .then(value => res(this.extractData(value)))
                .catch(value => rej(this.handleError(value)));
        });
        return p;
    }
};
TreeService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], TreeService);
exports.TreeService = TreeService;
//# sourceMappingURL=tree.service.js.map