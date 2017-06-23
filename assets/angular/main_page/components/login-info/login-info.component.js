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
const auth_service_1 = require('../../services/auth.service');
let LoginInfoComponent = class LoginInfoComponent {
    constructor(authService) {
        this.authService = authService;
        this.error = true;
        this.password = "";
        this.email = "";
    }
    validateEmail(mail) {
        return (/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(mail));
    }
    check_validity() {
        console.log("checking validity" + this.email + this.password);
        if (this.email.length == 0) {
            this.loginError = "missing email";
            this.error = true;
            return null;
        }
        else if (!this.validateEmail(this.email)) {
            this.loginError = "invalid email";
            this.error = true;
            return null;
        }
        else if (this.password.length == 0) {
            this.loginError = "";
            this.error = true;
            return null;
        }
        else {
            this.loginError = null;
            this.error = false;
        }
    }
    login() {
        this.authService.login({ password: this.password, email: this.email })
            .then(value => { this.checkAuth(); console.log("a"); })
            .catch(value => { this.loginError = value; console.log("b"); });
    }
    checkAuth() {
        this.authService.checkAuth()
            .then(value => { this.loggedIn = value; console.log("c"); })
            .catch(value => { this.loggedIn = ""; console.log("d"); });
    }
    logout() {
        this.authService.logout()
            .then(value => { this.checkAuth(); console.log("e"); })
            .catch(value => { this.checkAuth(); console.log("f"); });
    }
};
LoginInfoComponent = __decorate([
    core_1.Component({
        selector: 'login-info',
        template: `
	<div class="form-group navbar-form">
		<div *ngIf="!loggedIn">
			<div *ngIf="loginError" class="form-group text-danger" >
				{{loginError}}
			</div>
			<input type="email" [(ngModel)]="email" (change)="check_validity()" class="form-control" placeholder="example@mail.com">
			<input  type="password" [(ngModel)]="password" (change)="check_validity()" class="form-control" placeholder="password">
			<button (click)="login()" [disabled]="error" class="btn btn-default">Log in</button>

		</div>
		<div *ngIf="loggedIn" >
			<div class="form-group text-info" >
				logged in as: {{loggedIn}}
			</div>
			<!--<span class="alert alert-info">logged in as: {{loggedIn}}</span>-->
			<button (click)="logout()" class="btn btn-default">log out</button>
		</div>
	</div>
	`,
    }), 
    __metadata('design:paramtypes', [auth_service_1.AuthService])
], LoginInfoComponent);
exports.LoginInfoComponent = LoginInfoComponent;
//# sourceMappingURL=login-info.component.js.map