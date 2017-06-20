import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import {RegisterInterface} from '../util/register-interface';
import { LoginInterface} from '../util/login-interface';

//TEMP
const USERS:RegisterInterface[] =
	[
		{
		username:"username_1",
		password:"password_1",
		email:"username_1@mail.com"
		},
		{
		username:"username_2",
		password:"password_2",
		email:"username_3@mail.com"
		},
		{
		username:"username_3",
		password:"password_3",
		email:"username_3@mail.com"
		}
	]
//TEMP
const CURRENTUSER:LoginInterface = {username:"username_1",password:"password_1"}

@Injectable()
export class AuthService
	{
	constructor(private http: Http) { }

	//function for simulating server answer. 90%chance of success, returns observable
	randomServerAnswer(res:any,rej:any):Promise<any>
		{
		let p = new Promise((resolve,reject)=>
			{
			let chance = Math.random();
			if (chance < 0.9)
				{setTimeout(()=>{resolve(res)},50)}
			else
				{setTimeout(()=>{reject(rej)},50)}
			});
		return p;
		}

	currentUser:string
	successMessage:string
	errorMessage:string

	//registering user
	register(userData:RegisterInterface):void
		{
		//server api does not exist yet
		this.randomServerAnswer({success:"user register, proceed to login"}, {error:"registration error"}).then(
			successMessage => this.successMessage = successMessage,
			error =>  this.errorMessage = this.errorMessage);
		}

	//logging user in
	login(userData:LoginInterface):void
		{
		//server api does not exist yet
		this.randomServerAnswer({username:"username_1"},{error:"login error"}).then(
			success => {this.successMessage = "succesfully logged in"; this.currentUser=success.username},
			error =>  this.errorMessage = this.errorMessage);
		}

	//logging user in
	authUser(username:string):void
		{
		//server api does not exist yet
		this.randomServerAnswer({username:"username_1"},{error:"login error"}).then(
			success => {this.successMessage = "succesfully authenticated"; this.currentUser=success.username},
			error =>  this.errorMessage = this.errorMessage);
		}
	
	}
