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
const tree_service_1 = require('../services/tree.service');
let ApiTestComponent = class ApiTestComponent {
    constructor(treeService) {
        this.treeService = treeService;
        this.name = 'test api';
    }
    getAllTrees() {
        console.log("button for getTree pressed");
        this.treeService.getTree().then(data => { console.log(data); });
    }
};
ApiTestComponent = __decorate([
    core_1.Component({
        selector: 'api-test',
        template: `<h1>Hello {{name}}</h1>
	<button (click)="getAllTrees()"> get all trees </button>
	<button (click)="addSampleTree()"> get all trees </button>
	`,
    }), 
    __metadata('design:paramtypes', [tree_service_1.TreeService])
], ApiTestComponent);
exports.ApiTestComponent = ApiTestComponent;
//# sourceMappingURL=api-test.component.js.map