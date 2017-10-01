import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpProvider} from '../../providers/http/http';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	login_id:any;
	password:any;
	company_name:any;
	address:any;
	ctc_no: any;
	email: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,public navParams: NavParams,public httpService: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

save():void{
	let newprofile = {
		login_id : this.login_id,
		password : this.password,
		company_name: this.company_name,
		address: this.address,
		ctc_no: this.ctc_no,
		email: this.email
	};

	this.viewCtrl.dismiss(newprofile);
}

close(): void{
	this.viewCtrl.dismiss();
}
}
