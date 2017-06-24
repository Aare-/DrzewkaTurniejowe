import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service'

@Component
	({
  selector: 'login-info',
  template: `
	<div class="form-group navbar-form">
		<div *ngIf="!loggedIn">
			<div *ngIf="loginError" class="form-group text-danger" >
				{{loginError}}
			</div>
			<form>
			<input name="emailinput" type="email" required [(ngModel)]="email"  class="form-control" placeholder="example@mail.com">
			<input name="passwordinput"  type="password" required [(ngModel)]="password"  class="form-control" placeholder="password">
			<button name="buttoninput" (click)="login()" class="btn btn-default">Log in</button>
			</form>
		</div>
		<div *ngIf="loggedIn" >
			<div class="form-group" >
				logged in as:<a [routerLink]="['/user', loggedIn]">{{loggedIn}}</a>
			</div>
			<!--<span class="alert alert-info">logged in as: {{loggedIn}}</span>-->
			<button (click)="logout()" class="btn btn-default">log out</button>
		</div>
	</div>
	`,
	})
export class LoginInfoComponent
	{
	error = true;

	validateEmail(mail:string)
	{
	 return(/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(mail))
	}

	check_validity():any
		{
		console.log("checking validity"+this.email+this.password);
		if(this.email.length == 0)
			{this.loginError="missing email"; this.error = true; return null}
		else if(!this.validateEmail(this.email))
			{this.loginError="invalid email"; this.error = true; return null}
		else if(this.password.length == 0)
			{this.loginError=""; this.error = true; return null}
		else
			{this.loginError=null; this.error = false;}
		}
	constructor(private authService:AuthService){}
	password:string ="";
	email:string ="";
	loggedIn:string;
	loginError:string;
	login():void
		{
		this.authService.login({password:this.password,email:this.email})
										.then(value=>{this.checkAuth(); console.log("a");})
										.catch(value => {this.loginError=value ; console.log("b");});
		}
	checkAuth():void
		{
		this.authService.checkAuth()
										.then(value=>{this.loggedIn=value; console.log("c");})
										.catch(value=>{this.loggedIn=""; console.log("d");})

		}
	logout():void
		{
		this.authService.logout()
										.then(value=>{this.checkAuth(); console.log("e");})
										.catch(value=>{this.checkAuth(); console.log("f");})
		}

	treeToDisplayableTree(tree:any):void
		{

		}
	}
