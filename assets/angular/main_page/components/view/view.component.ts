import { Component } from '@angular/core';
import {TreeService} from '../../services/tree.service'

@Component
	({
  selector: 'view',
  template: `
	<h2>mockup of view </h2>
	`,
	})
export class ViewComponent
	{
	constructor(private treeService:TreeService){}
	}
