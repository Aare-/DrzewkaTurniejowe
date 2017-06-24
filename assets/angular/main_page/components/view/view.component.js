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
let ViewComponent = class ViewComponent {
    constructor(treeService, authService, activatedRoute, router) {
        this.treeService = treeService;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.self = this;
    }
    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });
        this.refreshTree();
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    refreshTree() {
        this.treeService.getTreeById(this.id).subscribe(tree => { console.log(tree); this.tree = tree; this.builtTree = this.treeToDisplayableTree(tree); console.log(this.builtTree); }, error => { console.log(error); this.error = error; });
    }
    addParticipant(email, name) {
        this.treeService.addParticipantToTree(this.id, name, email).subscribe(response => { this.refreshTree(); }, error => { console.log(error); this.error = error; });
    }
    removeParticipant(email) {
        //console.log("trying to remove");
        //console.log(email);
        this.treeService.removeParticipantFromTree(this.id, email).subscribe(response => { this.refreshTree(); }, error => { console.log(error); this.error = error; });
    }
    removeTree() {
        this.treeService.removeTree(this.id).subscribe(response => { this.refreshTree(); this.router.navigate(['/browse']); }, error => { console.log(error); this.error = error; this.refreshTree(); });
    }
    buildTree() {
        //console.log("building tree");
        this.treeService.buildTree(this.tree._id).subscribe(response => { this.refreshTree(); console.log(this.tree); }, error => { console.log(error); this.error = error; this.refreshTree(); });
    }
    treeToDisplayableTree(tree) {
        let newnodes = [];
        let root;
        for (let i of tree.TreeNodes) {
            let toPush = { children: [], node: i };
            if (!i.NextTreeNode_id) {
                root = toPush;
            }
            else {
                newnodes.push(toPush);
            }
        }
        //console.log(newnodes);
        //console.log(root);
        let reTreedNodes = newnodes;
        //console.log(reTreedNodes);
        reTreedNodes.push(root);
        while (newnodes.length > 1) {
            for (let i of newnodes) {
                for (let j of reTreedNodes) {
                    //console.log("i and j");
                    //console.log(i);
                    //console.log(j);
                    if (i.node.NextTreeNode_id == j.node._id) {
                        j.children.push(i);
                        newnodes = newnodes.filter(obj => obj !== i);
                        break;
                    }
                }
                break;
            }
        }
        //console.log("root:");
        //console.log(root);
        return (root);
    }
};
ViewComponent = __decorate([
    core_1.Component({
        selector: 'view',
        template: `
	<div class="container">
		<!--<h2>mockup of view </h2>
		<p>{{id}}</p>-->
		<h3 class="text-danger" *ngIf="!tree"> There is no tree to display at this address</h3>
		<div *ngIf="tree">
			<div>
				<div> <!-- here whall be built tree-->
					<h3>Tree</h3>
					<tree-view *ngIf="builtTree" [viewParent]="self" [newNode]="builtTree" [tree]="tree"></tree-view>
				</div>
				<div class="row">
				<div class ="col-sm-6">
				<p>owner:<a [routerLink]="['/user', tree.Owner]">{{tree.Owner}}</a></p>
				<h3>Participants</h3>
				<table class="table ">
			    <thead>
					</thead>
					<tbody>
						<tr *ngFor="let participant of tree.Participants">
							<td *ngIf="tree.Owner==authService.currentUserId">
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
				<div *ngIf="(tree.Participants.length==0) || !tree.Participants" class="alert alert-info"> There are no participants in this tree</div>
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
						<h3>Options:</h3>
						<form class="form-inline">
							<div class = "form-group">
								<button (click)="buildTree()" class="btn btn-default"> Build/Rebuild tree</button>
								<button (click)="removeTree()" class="btn btn-danger"> Remove tree</button>
							</div>
						</form>
					</div>
				</div>

			</div>
		</div>

	<div *ngIf="error" class="alert alert-danger">{{error}}</div>
	</div>
	`,
    }), 
    __metadata('design:paramtypes', [tree_service_1.TreeService, auth_service_1.AuthService, router_1.ActivatedRoute, router_2.Router])
], ViewComponent);
exports.ViewComponent = ViewComponent;
//# sourceMappingURL=view.component.js.map