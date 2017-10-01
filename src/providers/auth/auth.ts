import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public token: any
  constructor(public http: Http, private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  checkAuthentication (){
  	return new Promise ((resolve,reject)=>{
  		this.storage.get ('token').then((value)=> {
  			this.token=value;

  			let headers =new Headers ();
  			headers.append ('Authorization',this.token);

  			this.http.get('https://arcane-castle-88561.herokuapp.com/api/login',{headers:headers})
  			.subscribe(res=>{
  				resolve (res);
  			}, (err) => {
  				reject (err);
  			});
  		})

  	});
  }

register(profile){
	return new Promise ((resolve,reject)=>{
		let headers = new Headers({'Content-Type':'application/json'});
		this.http.post('https://arcane-castle-88561.herokuapp.com/api/profile',JSON.stringify(profile),{headers:headers})
			.subscribe(res=>{
				let data= res.json();
				this.token=data.token;
				this.storage.set('token',data.token);
				resolve(data);
			},(err) => {
				reject (err);
			});
			
	});
}

 login(credentials){
 	return new Promise ((resolve,reject)=>{

 		let headers= new Headers ();
 		headers.append ('Content-Type','application/json');

 		this.http.post('https://arcane-castle-88561.herokuapp.com/api/login', JSON.stringify(credentials),{headers:headers})
 		.subscribe (res=> {
 			let data = res.json();
 			this.token= data.token;
 			this.storage.set ('token', data.token);
 			resolve(data);

 			resolve(res.json());
 		},(err)=>{
 			reject (err);
 		});
 	});
 }

 logout(){
 	this.storage.set ('token','');
 }


}
