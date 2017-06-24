import { Component,Input } from '@angular/core';
import {TreeService} from '../../services/tree.service';
import {AuthService} from '../../services/auth.service';
import { OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component
	({
  selector: 'tree-view',
  template: `


	<table >
		<tbody><tr>

			<td *ngIf="newNode.children.length>0">
				<tree-view *ngFor="let child of newNode.children" [newNode]="child" [tree]="tree" [viewParent]="viewParent"></tree-view>
			</td>


			<td *ngIf="newNode.node.Player1_id || newNode.node.Player2_id" >

				<table >
					<tbody>
				<!--		<td>
							<p>{{newNode.node._id}}</p>
							<span class="inline" *ngIf="newNode.node.Result">{{newNode.node.Result}}</span>
						</td> -->
						<td>
							<div class="alert">
								<div  *ngIf="newNode.node.Player1_id" [class.alert-info]="newNode.node.Result == 1">
									<button *ngIf="tree.Owner == authService.currentUserId" class="btn btn-default" (click)="setResult(1)">set winner</button>
									<span class="lead">1: <b>{{getParticipantFromTreeById(newNode.node.Player1_id).DisplayName}} </b></span>

								</div>
								<div *ngIf="tree.Owner == authService.currentUserId" class =" alert-warning">
									<button  class="btn btn-default" (click)="setResult(0)">draw</button>
								</div>
								<div  *ngIf="newNode.node.Player2_id" [class.alert-info]="newNode.node.Result == 2">
									<button *ngIf="tree.Owner == authService.currentUserId" class="btn btn-default" (click)="setResult(2)">set winner</button>
									<span class="lead">2: <b>{{getParticipantFromTreeById(newNode.node.Player2_id).DisplayName}}</b></span>
								</div>
							</div>
						</td>

						<td>
						</td>
					</tbody>
				</table>



			</td>


		</tr></tbody>
	</table>



<!--
	<p>{{newNode.node._id}}</p>

	<tree-view *ngFor="let child of newNode.children" [newNode]="child" [tree]="tree"></tree-view>

	<p *ngIf="newNode.node.Player1_id">player 1 {{getParticipantFromTreeById(newNode.node.Player1_id).DisplayName}}</p>
	<p *ngIf="newNode.node.Player2_id">player 2 {{getParticipantFromTreeById(newNode.node.Player2_id).DisplayName}}</p>
-->


	`,})
export class TreeViewComponent
	{
	constructor(private treeService:TreeService,private authService:AuthService, private activatedRoute:ActivatedRoute, private router:Router){}
	@Input()
	newNode:any;

	@Input()
	tree:any;

	@Input()
	viewParent:any;

	getParticipantFromTreeById(id:string):void
		{
		for(let i of this.tree.Participants)
			{
			if(i._id == id)
				return(i);
			}
		}
	setResult(result:number):void
		{
		console.log("starting to set result:"+result+" of tree:"+this.tree._id+" node:"+this.newNode.node._id);
		this.treeService.setNodeResult(this.tree._id,this.newNode.node._id,result).subscribe(
			response=>{this.viewParent.refreshTree(); console.log("got response");},
			error=>{console.log(error); });
		}
	}
