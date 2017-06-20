import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import {TreeInterface} from '../util/tree-interface';

const SampleTree : TreeInterface =
  {
     TreeName :  "tree_0" ,
     Participants :  "participants" ,
     TreeNodes :  "nodes" ,
     _id :  "0" ,
     createdAt :  new Date("2017-06-18")  ,
     updatedAt :  new Date("2017-06-18")
  }

const SampleTreeList =[
  {
     TreeName :  "tree_0" ,
     Participants :  "participants" ,
     TreeNodes :  "nodes" ,
     _id :  "0" ,
     createdAt :  new Date("2017-06-18")  ,
     updatedAt :  new Date("2017-06-18")
  },
  {
     TreeName :  "tree_1" ,
     Participants :  "participants" ,
     TreeNodes :  "nodes" ,
     _id :  "1" ,
     createdAt :  new Date("2017-06-18")  ,
     updatedAt :  new Date("2017-06-18")
  },
]

const SampleError = {
   statusCode : 400,
   error :  "Bad Request" ,
   message :  ["sample_err_message "],
   validation : {
     source :  "payload" ,
     keys : [
       "value"
    ]
  }
}



@Injectable()
export class TreeService
	{
	//!!!!!!!
	//api is incomplete
	//loging/authentication api will be in separate service
	//currently we have problems with database, as it teoertically exists, it only spews errors. Its not my problem - ill have to inform about it, and work around it.
	//so this service will be acting as a stub

	 constructor(private http: Http) { }

	//function simulating server randomly answering calls. returns an Observable with 90% chance of resolving and 10% rejecting in 50 miliseconds
	randomServerAnswer(res:any,rej:any):Promise<any>
		{
		let p = new Promise((resolve,reject)=>
			{
			let chance = Math.random();
			if (chance < 0.9)
				{setTimeout(()=>{resolve(res)},50)}
			else
				{setTimeout(()=>{reject(rej)},50)}
			});

		return p;
		}

		//generally this should be handling promises or sumthin'

	  // Get all Trees from the API
	 getTree():Promise<TreeInterface[]>
		{
	   //return this.http.get('/rest/Tree');
		return this.randomServerAnswer(SampleTreeList,SampleError);
	  }
		//deletes one or more trees from API
	 deleteTree(tree:any[]):Promise<TreeInterface[]>
		{
	  //return this.http.delete('/rest/Tree');
		return this.randomServerAnswer(SampleTreeList,SampleError);
	  }
		//deletes one or more trees from API
	 postTree(tree:any[]):Promise<TreeInterface[]>
		{
	  //return this.http.post('/rest/Tree');
		return this.randomServerAnswer(SampleTreeList,SampleError);
	  }

	  // Get Tree by ID
	 getTreeID(id:string):Promise<TreeInterface>
		{
	   //return this.http.get('/rest/Tree/'+id);
		return this.randomServerAnswer(SampleTree,SampleError);
	  }
		//deletes one or more trees from API
	 deleteTreeID(id:string):Promise<TreeInterface>
		{
	  //return this.http.delete('/rest/Tree/'+id);
		return this.randomServerAnswer(SampleTree,SampleError);
	  }
		//deletes one or more trees from API
	 postTreeID(id:string):Promise<TreeInterface>
		{
	  //return this.http.post('/rest/Tree/'+id);
		return this.randomServerAnswer(SampleTree,SampleError);
	  }
	}
