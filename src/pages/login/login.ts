import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, LoadingController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  // 前台获取的值
  mobile: any;
  password: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController
  ) {
    super()
  }

  login() {
    let loading = super.showLoading(this.loadingCtrl, '登陆中...');
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
