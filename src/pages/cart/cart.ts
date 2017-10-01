import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import {DataProvider} from '../../providers/data/data';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  orderList=[]
  total=0
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider,public alertCtrl: AlertController) {
  	 this.dataService.getData().then((orders)=>
      { if(orders){
        this.orderList=JSON.parse(orders); 
        console.log("order is"+ orders);
      }
      }
      )
  }

   ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  //   var orderlist;

  //   for (var i=0; i<orderlist.length; i++){
  //   	this.total += order.item[i].price;
  //   }
  }


 removeItem(){
           this.dataService.deleteData('',(orders)=> {
             this.orderList = JSON.parse(orders);
           })
          }

presentConfirm() {
  const alert = this.alertCtrl.create({
    title: 'Order Confirmation',
    message: 'Confirm Order?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Submit',
        handler: () => {
          console.log('Buy clicked');
          this.navCtrl.push(HomePage);
        }
      }
    ]
  });
  alert.present();
}     
}