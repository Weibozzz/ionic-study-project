import {Component} from '@angular/core';
import {
  IonicPage, NavController, NavParams,
  ViewController, LoadingController, ToastController
} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from '../../providers/rest/rest';

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
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public rest: RestProvider
  ) {
    super()
  }

  login() {
    this.rest.login('15691808595', 'sfdfdsdf')
      .subscribe((data) =>
        console.log(data))
    let loading = super.showLoading(this.loadingCtrl, '登陆中...');
    setTimeout(() => {
      loading.dismiss();
      super.showToast(this.toastCtrl, 'toast...');
    }, 2000);
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
