import { Component } from '@angular/core';
import {TreeService} from '../services/tree.service'

@Component({
  selector: 'api-test',
  template: `<h1>Hello {{name}}</h1>
	<button (click)="getAllTrees()"> get all trees </button>
	<button (click)="addSampleTree()"> get all trees </button>
	`,
})
export class ApiTestComponent
{
constructor(private treeService:TreeService){}
name = 'test api';
getAllTrees():void
	{
	console.log("button for getTree pressed")
	this.treeService.getTree().then(
					data => {console.log(data);});
	}


}
