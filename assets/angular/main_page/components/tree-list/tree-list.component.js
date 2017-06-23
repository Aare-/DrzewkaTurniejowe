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
let TreeListComponent = class TreeListComponent {
    constructor(treeService, authService) {
        this.treeService = treeService;
        this.authService = authService;
        this.maxPage = 1;
        this.currentPage = 1;
        this.username = "";
    }
    ngOnInit() { this.getTreesByParam(10, 1); }
    refresh() {
        console.log("refreshing");
        this.getTreesByParam(10, this.currentPage);
    }
    getTreesByParam(nPerPage, pNum) {
        //console.log("printing test username before applying it to service");
        //console.log(this.username);
        this.treeService.getTreesByParam(nPerPage, pNum, this.username)
            .then(value => {
            //console.log("printing page number");
            //console.log(value);
            this.trees = value.docs;
            for (let i = 0; i < this.trees.length; i++) {
                let ca = new Date(this.trees[i].createdAt);
                let ua = new Date(this.trees[i].updatedAt);
                this.trees[i].createdAt = ca.getDay() + "-" + ca.getMonth() + "-" + ca.getFullYear();
                this.trees[i].updatedAt = ua.getDay() + "-" + ua.getMonth() + "-" + ua.getFullYear();
            }
            this.maxPage = value.pages.total;
            this.currentPage = value.pages.current;
            this.pages = [];
            for (let i = 1; i <= this.maxPage; i++) {
                this.pages.push(i);
            }
            console.log(this.pages);
        })
            .catch(value => {
            //console.log("printing db error");
            //console.log(value);
            this.error = value.status;
        });
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], TreeListComponent.prototype, "username", void 0);
TreeListComponent = __decorate([
    core_1.Component({
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
    }), 
    __metadata('design:paramtypes', [tree_service_1.TreeService, auth_service_1.AuthService])
], TreeListComponent);
exports.TreeListComponent = TreeListComponent;
//# sourceMappingURL=tree-list.component.js.map