import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Headers, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import {TreeInterface} from '../util/tree-interface';




@Injectable()
export class TreeService
	{
	//!!!!!!!
	//api is incomplete
	//loging/authentication api will be in separate service
	//currently we have problems with database, as it teoertically exists, it only spews errors. Its not my problem - ill have to inform about it, and work around it.
	//so this service will be acting as a stub

	constructor(private http: Http) { }

	//helper method, for extracting data in response._body.docs
	private extractData(res: Response)
		{
				console.log(res.json());
		    let body = res.json();
		    return body || { };
		}
	//helper method
  private handleError (error: Response | any)
		{

    console.error(error);
    return Observable.throw(error);
  	}


	// Get all Trees from the API
	getTree():Observable<any[]>
		{
	  //return this.http.get('/rest/Tree');
    return this.http.get('/rest/Tree')
                    .map(this.extractData)
                    .catch(this.handleError);
	  }

	// post new tree to the API. tree cant have id, createdAt and updatedAt
	postTree(tree:TreeInterface):Observable<any[]>
		{
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });

	  return this.http.post('/rest/Tree', tree, options)
	                  .map(this.extractData)
	                  .catch(this.handleError);
		}



	//Get tree given it's id string
	getTreeById(treeId:string):Observable<any[]>
		{
	  //return this.http.get('/rest/Tree');
    return this.http.get('/rest/Tree/'+treeId)
                    .map(this.extractData)
                    .catch(this.handleError);
	  }


	}
