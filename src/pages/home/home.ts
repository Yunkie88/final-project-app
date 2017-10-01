import { Component } from '@angular/core';
import { NavController, ModalController,LoadingController} from 'ionic-angular';
import { CategoryListPage } from '../category-list/category-list';
import { RegisterPage } from '../register/register';
import {HttpProvider} from '../../providers/http/http';
import {AuthProvider} from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profiles=[];
  login_id:string;
  password:string;
  loading:any

  constructor(public navCtrl: NavController, public modalCtrl:ModalController,public httpService: HttpProvider,public authService: AuthProvider, public loadingCtrl: LoadingController) {

  }

ionViewDidLoad(){
	this.showLoader();

	this.authService.checkAuthentication().then((res)=>{
		console.log ('Already authorized');
		this.loading.dismiss();
		this.navCtrl.setRoot (CategoryListPage);
	}, (err)=> {
		console.log ("Haven't Authorized");
		this.loading.dismiss();
	});
}

register() {
  	let modal= this.modalCtrl.create(RegisterPage);

  	modal.onDidDismiss (newprofile=>{
  		if(newprofile){
  			this.profiles.push(newprofile)
  			this.authService.register(newprofile);
  		
  		}
  	});

  	modal.present();
  }


login() {
  	this.showLoader();

  	let credentials ={
  		login_id: this.login_id,
  		password: this.password
  	};

  	this.authService.login(credentials).then((result)=>{
  		this.loading.dismiss();
  		console.log(result);
  		this.navCtrl.setRoot(CategoryListPage);
  	},(err)=>{
  		this.loading.dismiss();
  		console.log(err);
  	});
  }

  showLoader(){
  	this.loading=this.loadingCtrl.create({
  		content:"Authenticating..."
  	});

  	this.loading.present();
  }
}

