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
let RegisterComponent = class RegisterComponent {
    constructor(authService) {
        this.authService = authService;
    }
    onSubmit() {
        console.log("attempting to register " + this.email + " " + this.password1);
        this.authService.register({ email: this.email, password: this.password1 })
            .then(value => this.success = "successfully registerd. you may now log in")
            .catch(value => this.error = value.body.error);
    }
};
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register',
        template: `

	<div class="container">
		<h2>Registration</h2>
		<form (ngSubmit)="onSubmit()" #registerForm="ngForm">

			<div class="form-group">
				<label for="email">email</label>
				<input name="email" type="email" class="form-control" id="email" [(ngModel)]="email"
  			#vemail="ngModel" pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" required>
				<div [hidden]="vemail.valid || vemail.pristine"
				     class="alert alert-danger">
				  email is invalid
				</div>
			</div>

			<div class="form-group">
				<label for="password1">password</label>
				<input name="password1" type="password" class="form-control" id="password1" [(ngModel)]="password1" minlength="6" required #vpassword1="ngModel">

				<div *ngIf="vpassword1.errors && (vpassword1.dirty || vpassword1.touched)" class="alert alert-danger">
					<div [hidden]="!vpassword1.errors.required">
				      Password is invalid
					</div>
					<div [hidden]="!vpassword1.errors.minlength">
						Password must be at least 4 characters long.
					</div>
				</div>
			</div>

			<button name="button" type="submit" class="btn btn-success"  [disabled]="!registerForm.form.valid" >Submit</button>

		<div class="form-group">
			<div *ngIf="error"  class="alert alert-danger" >
			{{error}}
			</div>
		</div>

		<div class="form-group">
			<div *ngIf="success" class="alert alert-success">
			{{success}}
			</div>
		</div>
		</form>




	</div>

	`,
    }), 
    __metadata('design:paramtypes', [auth_service_1.AuthService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map