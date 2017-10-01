import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductListPage } from '../product-list/product-list';
import {HttpProvider} from '../../providers/http/http';
/**
 * Generated class for the CategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {
	categoryList=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService: HttpProvider) {
  	  this.httpService.getCategory()
    .subscribe (
      data=> {
        this.categoryList=data;
        console.log(this.categoryList)
      },
      err => {
        console.log(err);
      },
      ()=>{
        console.log ('everything is done!!!')
      }
      );
  }
ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
  }

toList(category) {
  	this.navCtrl.push(ProductListPage, {category:category})
  	console.log(category)
  }
}
