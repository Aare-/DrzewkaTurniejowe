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
//TEMP
const USERS = [
    {
        username: "username_1",
        password: "password_1",
        email: "username_1@mail.com"
    },
    {
        username: "username_2",
        password: "password_2",
        email: "username_3@mail.com"
    },
    {
        username: "username_3",
        password: "password_3",
        email: "username_3@mail.com"
    }
];
//TEMP
const CURRENTUSER = { username: "username_1", password: "password_1" };
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
    }
    //function for simulating server answer. 90%chance of success, returns observable
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
    //registering user
    register(userData) {
        //server api does not exist yet
        this.randomServerAnswer({ success: "user register, proceed to login" }, { error: "registration error" }).then(successMessage => this.successMessage = successMessage, error => this.errorMessage = this.errorMessage);
    }
    //logging user in
    login(userData) {
        //server api does not exist yet
        this.randomServerAnswer({ username: "username_1" }, { error: "login error" }).then(success => { this.successMessage = "succesfully logged in"; this.currentUser = success.username; }, error => this.errorMessage = this.errorMessage);
    }
    //logging user in
    authUser(username) {
        //server api does not exist yet
        this.randomServerAnswer({ username: "username_1" }, { error: "login error" }).then(success => { this.successMessage = "succesfully authenticated"; this.currentUser = success.username; }, error => this.errorMessage = this.errorMessage);
    }
};
AuthService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map