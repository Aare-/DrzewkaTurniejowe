import { Component } from '@angular/core';
import {TreeService} from '../../services/tree.service'
import {AuthService} from '../../services/auth.service'
import {TreeInterface} from '../../util/tree-interface'
import { OnInit } from '@angular/core';

@Component
	({
  selector: 'browse',
  template: `
	<div class ="container">
		<h2>browse component</h2>
		<tree-list></tree-list>
	</div>
	`,
	})
export class BrowseComponent
	{

	}
