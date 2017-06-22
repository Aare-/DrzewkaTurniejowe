import { Component } from '@angular/core';
import {TreeService} from '../services/tree.service'

import {TreeInterface} from '../util/tree-interface'


@Component({
  selector: 'api-test',
  template: `<h1>REST API testing grounds</h1>
	<button (click)="getAllTrees()"> get all trees </button>
	<button (click)="getTreeById('594bc296eb5be01264c905ae')"> get sample tree </button>
	<button (click)="postTree(SAMPLETREE)"> post sample tree </button>
	<h4>output:<h4>
	<p>{{output}}</p>
	<h4>error:<h4>
	<p>{{error}}</p>
	`,
})
export class ApiTestComponent
{
constructor(private treeService:TreeService){}
output = 'test message';
error = 'test error';
SAMPLETREE:TreeInterface =
	{
	TreeName: "a test sample tree",
	Owner: "a test sample owner"
	};
printOutput(output:any):void
	{
	//console.log(output);
	this.output = JSON.stringify(output);
	}
printError(error:any):void
	{
	this.error = JSON.stringify(error);
	}
getAllTrees():void
	{
	console.log("button for getTree pressed")
  this.treeService.getTree()
                   .subscribe(
                     heroes => this.printOutput(heroes),
                     error =>  this.printError(error));
	}
getTreeById(treeId:string):void
	{
	console.log("button for getTreeByID pressed")
  this.treeService.getTreeById(treeId)
                   .subscribe(
                     heroes => this.printOutput(heroes),
                     error =>  this.printError(error));
	}

postTree(tree:TreeInterface):void
	{
	console.log("button for postTree pressed");
	console.log(tree);
  this.treeService.postTree(tree)
                   .subscribe(
                     heroes => this.printOutput(heroes),
                     error =>  this.printError(error));
	}
}
