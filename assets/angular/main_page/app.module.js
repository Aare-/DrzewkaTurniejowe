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
const platform_browser_1 = require('@angular/platform-browser');
const router_1 = require('@angular/router');
const forms_1 = require('@angular/forms');
const http_1 = require('@angular/http');
const app_component_1 = require('./app.component');
const api_test_component_1 = require('./components/api-test.component');
const register_component_1 = require('./components/register/register.component');
const login_info_component_1 = require('./components/login-info/login-info.component');
const view_component_1 = require('./components/view/view.component');
const browse_component_1 = require('./components/browse/browse.component');
const home_component_1 = require('./components/home/home.component');
const tree_service_1 = require('./services/tree.service');
const auth_service_1 = require('./services/auth.service');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            router_1.RouterModule.forRoot([
                {
                    path: '',
                    redirectTo: '/home',
                    pathMatch: 'full'
                },
                {
                    path: 'register',
                    component: register_component_1.RegisterComponent
                },
                {
                    path: 'browse',
                    component: browse_component_1.BrowseComponent
                },
                {
                    path: 'home',
                    component: home_component_1.HomeComponent
                },
                {
                    path: 'view/:id',
                    component: view_component_1.ViewComponent
                },
                {
                    path: 'test',
                    component: api_test_component_1.ApiTestComponent
                },
            ])
        ],
        providers: [tree_service_1.TreeService, auth_service_1.AuthService],
        declarations: [
            app_component_1.AppComponent,
            api_test_component_1.ApiTestComponent,
            register_component_1.RegisterComponent,
            login_info_component_1.LoginInfoComponent,
            browse_component_1.BrowseComponent,
            view_component_1.ViewComponent,
            home_component_1.HomeComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
// ,
//   RouterModule.forRoot([
//     {
//       path: 'app',
//       component: AppComponent
//     }
//   ])
//# sourceMappingURL=app.module.js.map