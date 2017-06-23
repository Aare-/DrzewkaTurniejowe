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
let UserComponent = class UserComponent {
    constructor(treeService, authService, activatedRoute, router) {
        this.treeService = treeService;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.error = "";
    }
    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.user = params['email'];
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    addTree(name) {
        console.log("adding tree:" + name);
        this.treeService.postTree({ TreeName: name, Owner: this.user }).subscribe(response => {
            this.router.navigate(['/view/' + response._id]);
            console.log(response);
        }, error => { console.log(error); this.error = error; });
    }
};
__decorate([
    core_1.ViewChild('treelist'), 
    __metadata('design:type', Object)
], UserComponent.prototype, "treelist", void 0);
UserComponent = __decorate([
    core_1.Component({
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
    }), 
    __metadata('design:paramtypes', [tree_service_1.TreeService, auth_service_1.AuthService, router_1.ActivatedRoute, router_2.Router])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map