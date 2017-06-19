import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service'

@Component
	({
  selector: 'register',
  template: `
	<h2>mockup of register </h2>
	`,
	})
export class RegisterComponent
	{
	constructor(private treeService:AuthService){}
	}
