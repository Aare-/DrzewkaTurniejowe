import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Headers, RequestOptions } from '@angular/http';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {UserInterface} from '../util/user-interface';



@Injectable()
export class AuthService
	{
	currentUserId:string = "";
	constructor(private http: Http)
		{
		}


	//requires user interface with email and password
	register(user:UserInterface):Promise<any[]>
		{
		let newuser = {Email:user.email,Password:user.password};
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
 		return this.http.post('/rest/User', newuser, options).toPromise();
	  }

	//requires user interface with email and password
	//This is an awfull bootleg and should not live. Harken ye who have ears.
	login(user:UserInterface):Promise<any>
		{
		let params = new URLSearchParams;
		params.set("Email",user.email);
		params.set("Password",user.password);
		let self = this;
		let promise = new Promise((res,rej)=>
			{
			this.http.get('/rest/User', {search:params}).toPromise()
			.then
				(
				value =>
					{ console.log("printing response"); console.log(value.json());
					if(value.json().docs.length > 0)
						{
						self.currentUserId = user.email;
						res(null)
						}
					else
						{rej("wrong username or password")}
					}
				)
			.catch
				(
				value =>
					{rej("database error")}
				);
			});
		return promise;
	}

	checkAuth():Promise<any>
	{
	let self = this;
	return new Promise((res,rej) =>
		{
		if(self.currentUserId){res(self.currentUserId)}
		else{rej(null)}
		});
	}
	logout():Promise<any>
	{
	let self = this;
	return new Promise((res,rej) =>
		{
		self.currentUserId = "";
		res(self.currentUserId);
		});
	}
}
