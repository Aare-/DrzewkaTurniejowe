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
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.currentUserId = "";
    }
    //requires user interface with email and password
    register(user) {
        let newuser = { Email: user.email, Password: user.password };
        let headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        let options = new http_2.RequestOptions({ headers: headers });
        return this.http.post('/rest/User', newuser, options).toPromise();
    }
    //requires user interface with email and password
    //This is an awfull bootleg and should not live. Harken ye who have ears.
    login(user) {
        let params = new http_3.URLSearchParams;
        params.set("Email", user.email);
        params.set("Password", user.password);
        let self = this;
        let promise = new Promise((res, rej) => {
            this.http.get('/rest/User', { search: params }).toPromise()
                .then(value => {
                console.log("printing response");
                console.log(value.json());
                if (value.json().docs.length > 0) {
                    self.currentUserId = user.email;
                    res(null);
                }
                else {
                    rej("wrong username or password");
                }
            })
                .catch(value => { rej("database error"); });
        });
        return promise;
    }
    checkAuth() {
        let self = this;
        return new Promise((res, rej) => {
            if (self.currentUserId) {
                res(self.currentUserId);
            }
            else {
                rej(null);
            }
        });
    }
    logout() {
        let self = this;
        return new Promise((res, rej) => {
            self.currentUserId = "";
            res(self.currentUserId);
        });
    }
};
AuthService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map