import { Component } from '@angular/core';
import {TreeService} from '../../services/tree.service';
import {AuthService} from '../../services/auth.service';
import { OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component
	({
  selector: 'view',
  template: `
	<div class="container">
		<!--<h2>mockup of view </h2>
		<p>{{id}}</p>-->
		<h3 class="text-danger" *ngIf="!tree"> There is no tree to display at this address</h3>
		<div *ngIf="tree">
			<div>
				<div class="row">
				<div class ="col-sm-6">
				<p>owner:<a [routerLink]="['/user', tree.Owner]">{{tree.Owner}}</a></p>
				<h3>Participants</h3>
				<table class="table ">
			    <thead>
					</thead>
					<tbody>
						<tr *ngFor="let participant of tree.Participants">
							<td>
								<button (click)="removeParticipant(participant.EmailAddress)" class ="btn btn-danger">remove</button>
							</td>
							<td>
								{{participant.DisplayName}}
							</td>
							<td>
								<a [routerLink]="['/user', participant.EmailAddress]">{{participant.EmailAddress}}</a>
							</td>
						</tr>
					</tbody>
				</table>
				</div>
				</div>
				<div *ngIf="tree.Owner==authService.currentUserId">
					<div class="well well-sm">
						<h3>Add participant:</h3>
						<form class="form-inline">
							<div class = "form-group">
								<input type="email" email required placeholder="email" #emailinput class="form-control">
								<input type="text" required #nameinput placeholder="name" class="form-control">
								<button (click)="addParticipant(emailinput.value,nameinput.value)" class="btn btn-default"> add</button>
							</div>
						</form>
					</div>
					<div class="well well-sm">
						<h3>Remove tree:</h3>
						<form class="form-inline">
							<div class = "form-group">
								<button (click)="removeTree()" class="btn btn-danger"> Remove tree</button>
							</div>
						</form>
					</div>
					<div class="well well-sm">
						<h3>Build/Rebuild tree:</h3>
						<form class="form-inline">
							<div class = "form-group">
								<button (click)="buildTree()" class="btn btn-default"> Build tree</button>
							</div>
						</form>
					</div>
				</div>
				<div> <!-- here whall be built tree-->

				</div>
			</div>
		</div>

	<div *ngIf="error" class="alert alert-danger">{{error}}</div>
	</div>
	`,
	})
export class ViewComponent implements OnInit, OnDestroy
	{
	constructor(private treeService:TreeService,private authService:AuthService, private activatedRoute:ActivatedRoute, private router:Router){}
	id:string;
	private sub:any;
	tree:any;
	error:any;
	ngOnInit():void
		{
		this.sub = this.activatedRoute.params.subscribe(params =>
			{
			this.id = params['id'];
			});
		this.refreshTree();

		}
	ngOnDestroy()
		{
		this.sub.unsubscribe();
		}
	refreshTree():void
		{
		this.treeService.getTreeById(this.id).subscribe(
			tree=>{console.log(tree); this.tree =tree;},
			error=>{console.log(error); this.error =error;}
			);
		}

	addParticipant(email:string,name:string):void
		{

			this.treeService.addParticipantToTree(this.id,name,email).subscribe(
			response=>{ this.refreshTree();},
			error=>{console.log(error); this.error =error;}
			);
		}

	removeParticipant(email:string):void
		{
			//console.log("trying to remove");
			//console.log(email);
			this.treeService.removeParticipantFromTree(this.id,email).subscribe(
			response=>{ this.refreshTree();},
			error=>{console.log(error); this.error =error;}
			);
		}

	removeTree():void
		{
			this.treeService.removeTree(this.id).subscribe(
			response=>{ this.refreshTree(); this.router.navigate(['/browse']);},
			error=>{console.log(error); this.error =error; this.refreshTree();}
			);
		}

	buildTree():void
		{
		console.log("building tree");
		this.treeService.buildTree(this.tree._id).subscribe(
		response=>{ this.refreshTree();console.log(this.tree)},
		error=>{console.log(error); this.error =error; this.refreshTree();}
		);
		}
	

	}
