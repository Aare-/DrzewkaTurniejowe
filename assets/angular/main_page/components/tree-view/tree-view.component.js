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
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], TreeViewComponent.prototype, "newNode", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], TreeViewComponent.prototype, "tree", void 0);
TreeViewComponent = __decorate([
    core_1.Component({
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


	`, }), 
    __metadata('design:paramtypes', [tree_service_1.TreeService, auth_service_1.AuthService, router_1.ActivatedRoute, router_2.Router])
], TreeViewComponent);
exports.TreeViewComponent = TreeViewComponent;
//# sourceMappingURL=tree-view.component.js.map