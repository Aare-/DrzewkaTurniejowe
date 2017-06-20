import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service'

@Component
	({
  selector: 'login-info',
  template: `
	<h2>mockup of login-info </h2>
	`,
	})
export class LoginInfoComponent
	{
	constructor(private treeService:AuthService){}
	}
