import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
   <nav>
     <a routerLink="/home">home</a>
     <a routerLink="/browse">browse</a>
     <a routerLink="/browse">register</a>
     <a routerLink="/browse">view/0</a>
     <a routerLink="/test">test</a>
   </nav>
	<login-info></login-info>
	<router-outlet></router-outlet>




	`,
})
export class AppComponent  { name = 'Angular'; }
//
