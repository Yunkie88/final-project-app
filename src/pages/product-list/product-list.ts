import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPage } from '../../pages/cart/cart';
import {DataProvider} from '../../providers/data/data';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {  
  productList:any;
	currentNumber = 1;
	price
  orderList=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService: DataProvider, public toastCtrl: ToastController) {
    this.productList=navParams.get ('category');
    console.log(this.productList + "here")

  }


  
private increment () {
  this.currentNumber++;
}

private decrement () {
  this.currentNumber--;
}

total(){
    var total = 0;
    total = (this.price * this.currentNumber);
    
    return total;
}


  

  addCart(product) {
    console.log('button pressed')
        this.dataService.getData().then((order)=>
      { 
        if(order){
        this.orderList=JSON.parse(order); 
        
      }
      let newCartItem={"item": product, "quantity": this.currentNumber, completed: false}
        this.orderList.push(newCartItem);
        this.dataService.saveData(this.orderList);
        const toast = this.toastCtrl.create({
    message: 'Item was added into cart',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
})
}



ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

buttonTapped(){
  this.navCtrl.push(CartPage)
}

}