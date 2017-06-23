import { Component,Input } from '@angular/core';
import {TreeService} from '../../services/tree.service'
import {AuthService} from '../../services/auth.service'
import {TreeInterface} from '../../util/tree-interface'
import { OnInit } from '@angular/core';

@Component
	({
  selector: 'tree-list',
  template: `


	<div *ngIf="!trees" class="alert alert-warning">
		there are no trees to display
	</div>
	<div *ngIf="error" class="alert alert-warning">
		{{error}}
	</div>

	<table class="table">
    <thead>
			<tr>
				<th>Owner:</th>
				<th>Name:</th>
				<th>Created on:</th>
				<th>Updated on:</th>
			</tr>
    </thead>
    <tbody>
			<tr *ngFor="let tree of trees">
				<td>
					<a [routerLink]="['/user', tree.Owner]">{{tree.Owner}}</a>
				</td>
				<td>
					<a [routerLink]="['/view', tree._id]">{{tree.TreeName}}</a>
				</td>
				<td>{{tree.createdAt}}</td>
				<td>{{tree.updatedAt}}</td>
			</tr>
    </tbody>
	</table>

 <ul class="pagination">
  <li *ngFor="let page of pages">
		<button (click)="getTreesByParam(10,page)" class="btn btn-default">{{page}}</button>
	</li>
</ul>


	`,
	})
export class TreeListComponent implements OnInit
	{
	constructor(private treeService:TreeService,private authService:AuthService){}
	trees:any[];
	maxPage=1;
	pages:number[];
	currentPage=1;
	error:string;
	@Input()
	username:string="";

	ngOnInit():void{this.getTreesByParam(10,1);}

	refresh():void
		{
		console.log("refreshing");
		this.getTreesByParam(10,this.currentPage);
		}
	getTreesByParam(nPerPage:number,pNum:number):void
	{
	//console.log("printing test username before applying it to service");
	//console.log(this.username);
	this.treeService.getTreesByParam(nPerPage,pNum,this.username)
		.then(value=>
			{
			//console.log("printing page number");
			//console.log(value);
			this.trees =value.docs;
			for (let i = 0; i < this.trees.length; i++)
				{
				let ca = new Date(this.trees[i].createdAt);
				let ua = new Date(this.trees[i].updatedAt);
				this.trees[i].createdAt = ca.getDay()+"-"+ca.getMonth()+"-"+ca.getFullYear();
				this.trees[i].updatedAt = ua.getDay()+"-"+ua.getMonth()+"-"+ua.getFullYear();
				}


			this.maxPage = value.pages.total;
			this.currentPage = value.pages.current;
			this.pages=[]
			for (let i = 1; i <= this.maxPage; i++)
				{
				this.pages.push(i);
				}
			console.log(this.pages);
			})
		.catch(value=>
			{
			//console.log("printing db error");
			//console.log(value);
			this.error = value.status;
			});

	}

	}
