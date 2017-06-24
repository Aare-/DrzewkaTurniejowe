import { Component,Input,ViewChild } from '@angular/core';
import {TreeService} from '../../services/tree.service'
import {AuthService} from '../../services/auth.service'
import {TreeInterface} from '../../util/tree-interface'
import { OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component
	({
  selector: 'user',
  template: `
	<div class ="container">
		<h2>user component</h2>
		<tree-list #treelist [(username)]="user"></tree-list>
		<div *ngIf="user==authService.currentUserId" class="well">
			<h3>Add tree:</h3>
			<form class="form-inline">
				<div class="form-group">
					<input type="text" required #nameinput class="form-control" placeholder="name">
					<button (click)="addTree(nameinput.value)" class="btn btn-default">add tree</button>
				</div>
			</form>
		</div>
		<div *ngIf="error">{{error}}</div>
	</div>
	`,
	})
export class UserComponent implements OnInit, OnDestroy
	{
	constructor(private treeService:TreeService,private authService:AuthService, private activatedRoute:ActivatedRoute, private router:Router){}
	@ViewChild('treelist') treelist:any;

	user:string;
	private sub:any;
	error:string="";
	ngOnInit():void
		{
		this.sub = this.activatedRoute.params.subscribe(params =>
			{
			this.user = params['email'];
			});
		}
	ngOnDestroy()
		{
		this.sub.unsubscribe();
		}

	addTree(name:string):void
		{
		console.log("adding tree:"+name);
		this.treeService.postTree({TreeName:name,Owner:this.user}).subscribe(
		response=>{
			console.log(response);
			this.router.navigate(['/view/'+response["_id"]]);
			console.log(response);
			},
		error=>{console.log(error); this.error =error;}
		);
		}

	}
