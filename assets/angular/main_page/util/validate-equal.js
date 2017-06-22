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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require('@angular/core');
const forms_1 = require('@angular/forms');
let ValidateEqual_1 = class ValidateEqual {
    constructor(validateEqual) {
        this.validateEqual = validateEqual;
    }
    validate(c) {
        // self value (e.g. retype password)
        let v = c.value;
        // control value (e.g. password)
        let e = c.root.get(this.validateEqual);
        // value not equal
        if (e && v !== e.value)
            return {
                validateEqual: false
            };
        return null;
    }
};
let ValidateEqual = ValidateEqual_1;
ValidateEqual = ValidateEqual_1 = __decorate([
    core_1.Directive({
        selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
        providers: [
            { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(() => ValidateEqual), multi: true }
        ]
    }),
    __param(0, core_1.Attribute('validateEqual')), 
    __metadata('design:paramtypes', [String])
], ValidateEqual);
exports.ValidateEqual = ValidateEqual;
//# sourceMappingURL=validate-equal.js.map