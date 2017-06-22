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
        this.output = 'test message';
        this.error = 'test error';
    }
    printOutput(output) {
        //console.log(output);
        this.output = JSON.stringify(output);
    }
    printError(error) {
        this.error = error;
    }
    getAllTrees() {
        console.log("button for getTree pressed");
        this.treeService.getTree()
            .subscribe(heroes => this.printOutput(heroes), error => this.printError(error));
    }
    getTreeById(treeId) {
        console.log("button for getTreeByID pressed");
        this.treeService.getTreeById(treeId)
            .subscribe(heroes => this.printOutput(heroes), error => this.printError(error));
    }
    postTree(tree) {
        console.log("button for getTreeByID pressed");
        this.treeService.postTree(tree)
            .subscribe(heroes => this.printOutput(heroes), error => this.printError(error));
    }
};
ApiTestComponent = __decorate([
    core_1.Component({
        selector: 'api-test',
        template: `<h1>REST API testing grounds</h1>
	<button (click)="getAllTrees()"> get all trees </button>
	<button (click)="addSampleTree()"> add sample tree </button>
	<button (click)="getTreeById('5947b4c7b5fb3239196c7880')"> get sample tree </button>
	<button (click)="postTree('SAMPLETREE')"> post sample tree </button>
	<h4>output:<h4>
	<p>{{output}}</p>
	<h4>error:<h4>
	<p>{{error}}</p>
	`,
    }), 
    __metadata('design:paramtypes', [tree_service_1.TreeService])
], ApiTestComponent);
exports.ApiTestComponent = ApiTestComponent;
const SAMPLETREE = {
    TreeName: "a test sample tree",
    Owner: "a test sample owner",
    Participants: "test sample participants",
    TreeNodes: "test sample nodes"
};
//# sourceMappingURL=api-test.component.js.map