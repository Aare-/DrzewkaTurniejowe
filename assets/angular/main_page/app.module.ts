import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router'
import { FormsModule }   from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { ApiTestComponent }  from './components/api-test.component';
import { RegisterComponent }  from './components/register/register.component';
import { LoginInfoComponent }  from './components/login-info/login-info.component';
import { ViewComponent }  from './components/view/view.component';
import { BrowseComponent }  from './components/browse/browse.component';
import { HomeComponent }  from './components/home/home.component';
import { TreeListComponent }  from './components/tree-list/tree-list.component';
import { UserComponent }  from './components/user/user.component';

import { TreeService }  from './services/tree.service';
import {AuthService} from './services/auth.service';


@NgModule({
  imports:
		[
    BrowserModule,
		FormsModule,
		HttpModule,
		JsonpModule,
	RouterModule.forRoot(
			[
				{
				  path: '',
				  redirectTo: '/home',
				  pathMatch: 'full'
				},
      	{
        	path: 'register',
        	component: RegisterComponent
      	},
      	{
        	path: 'browse',
        	component: BrowseComponent
      	},
      	{
        	path: 'home',
        	component: HomeComponent
      	},
				{
				  path: 'view/:id',
				  component: ViewComponent
				},
				{
				  path: 'test',
				  component: ApiTestComponent
				},
				{
					path: 'user/:email',
					component: UserComponent
				},
    	])

  	],
	providers:		[TreeService,AuthService],
  declarations:
		[
		AppComponent,
		ApiTestComponent,
		RegisterComponent,
		LoginInfoComponent,
		BrowseComponent,
		ViewComponent,
		HomeComponent,
		TreeListComponent,
		UserComponent
		],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

// ,
//   RouterModule.forRoot([
//     {
//       path: 'app',
//       component: AppComponent
//     }
//   ])
