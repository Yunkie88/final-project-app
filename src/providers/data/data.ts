import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public storage:Storage) {
    console.log('Hello DataProvider Provider');
  }



saveData(data){
  	let newData=JSON.stringify (data)
  	console.log("here"+ newData);
  	this.storage.set('orders',newData)

  }

 getData(){
  	return this.storage.get('orders')
  }

 deleteData(data,resolve){
    this.storage.get ('orders').then((orders)=>
      { if(orders){
        let toDoArray = JSON.parse (orders)
        toDoArray.splice (toDoArray.indexOf(data),1)
        let arrayData = JSON.stringify (toDoArray)
        this.storage.set ('orders',arrayData)
        resolve (arrayData)

      }
    })
}
}