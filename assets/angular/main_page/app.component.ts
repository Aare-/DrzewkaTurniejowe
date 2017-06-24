import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
   <nav class="navbar navbar-default">
  	<div class="container-fluid">
			<ul class="nav navbar-nav">
				<li><a routerLink="/home">home</a></li>
				<li><a routerLink="/browse">browse</a></li>
				<li><a routerLink="/register">register</a></li>

			</ul>
			<div class="nav navbar-nav navbar-right">
				<login-info></login-info>
			</div>
		</div>
   </nav>

	<router-outlet></router-outlet>




	`,
})
export class AppComponent  { }
//
