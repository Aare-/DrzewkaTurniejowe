import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service'

@Component
	({
  selector: 'login-info',
  template: `
	<h2>mockup of login-info </h2>
	<div *ngIf="!loggedIn">
		<input type="email" [(ngModel)]="email" (change)="check_validity()">
		<input type="password" [(ngModel)]="password" (change)="check_validity()">
		<button (click)="login()" [disabled]="error" >Log in</button>
		<div *ngIf="loginError" class="alert alert-danger">
		{{loginError}}
		</div>
	</div>
		<div *ngIf="loggedIn" class="alert alert-info">
		logged in as: {{loggedIn}}
		<button (click)="logout()">log out</button>
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


	}
