import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
   <nav>
     <a routerLink="/home">home</a>
     <a routerLink="/browse">browse</a>
   </nav>
	<router-outlet></router-outlet>
	<login-info><login-info>



	`,
})
export class AppComponent  { name = 'Angular'; }
//
