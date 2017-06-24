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


	<table>
		<tbody><tr>
			<td>
				<p>{{newNode.node._id}}</p>
			<td>
			<td *ngIf="newNode.children.length==2">
				<tree-view *ngFor="let child of newNode.children" [newNode]="child" [tree]="tree"></tree-view>
			<td>
			<td *ngIf="newNode.children.length<2">
				<tree-view *ngFor="let child of newNode.children" [newNode]="child" [tree]="tree"></tree-view>
				<p *ngIf="newNode.node.Player1_id">player 1 {{getParticipantFromTreeById(newNode.node.Player1_id).DisplayName}}</p>
				<p *ngIf="newNode.node.Player2_id">player 2 {{getParticipantFromTreeById(newNode.node.Player2_id).DisplayName}}</p>
			<td>
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

	getParticipantFromTreeById(id:string):void
		{
		for(let i of this.tree.Participants)
			{
			if(i._id == id)
				return(i);
			}
		}
	}
