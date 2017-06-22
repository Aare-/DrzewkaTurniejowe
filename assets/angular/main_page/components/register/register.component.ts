import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';



@Component
	({
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
				<input name="password1" type="password" class="form-control" id="password1" [ngModel]="password1" minlength="6" required #vpassword1="ngModel">

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
	})
export class RegisterComponent
	{
	email:string="email";
	password1:string="pass_1";
	error:string;
	success:string;
	//temp
	name:string;
	constructor(private authService:AuthService){}

	onSubmit():void
		{
		console.log("attempting to register "+this.email+" "+this.password1);
		this.authService.register({email:this.email,password:this.password1})
										.then(value => this.success ="successfully registerd. you may now log in")
										.catch(value => this.error = value.body.error);
		}


	}
