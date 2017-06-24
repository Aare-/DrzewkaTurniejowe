"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const tree_service_1 = require('../../services/tree.service');
const auth_service_1 = require('../../services/auth.service');
const router_1 = require('@angular/router');
const router_2 = require('@angular/router');
let TreeViewComponent = class TreeViewComponent {
    constructor(treeService, authService, activatedRoute, router) {
        this.treeService = treeService;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.router = router;
    }
    getParticipantFromTreeById(id) {
        for (let i of this.tree.Participants) {
            if (i._id == id)
                return (i);
        }
    }
    setResult(result) {
        console.log("starting to set result:" + result + " of tree:" + this.tree._id + " node:" + this.newNode.node._id);
        this.treeService.setNodeResult(this.tree._id, this.newNode.node._id, result).subscribe(response => { this.viewParent.refreshTree(); console.log("got response"); }, error => { console.log(error); });
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], TreeViewComponent.prototype, "newNode", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], TreeViewComponent.prototype, "tree", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], TreeViewComponent.prototype, "viewParent", void 0);
TreeViewComponent = __decorate([
    core_1.Component({
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


	`, }), 
    __metadata('design:paramtypes', [tree_service_1.TreeService, auth_service_1.AuthService, router_1.ActivatedRoute, router_2.Router])
], TreeViewComponent);
exports.TreeViewComponent = TreeViewComponent;
//# sourceMappingURL=tree-view.component.js.map