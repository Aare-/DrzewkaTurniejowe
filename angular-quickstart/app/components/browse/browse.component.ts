import { Component } from '@angular/core';
import {TreeService} from '../../services/tree.service'

@Component
	({
  selector: 'browse',
  template: `
	<h2>mockup of browse </h2>
	`,
	})
export class BrowseComponent
	{
	constructor(private treeService:TreeService){}
	}
