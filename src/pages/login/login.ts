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
  errorMessage: any;

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
    let loading = super.showLoading(this.loadingCtrl, '登陆中...');
    this.rest.login(this.mobile, this.password)
      .subscribe(f => {
          loading.dismiss();
          const {Status, StatusContent} = f;
          if (Status === 'FAIL') {
            super.showToast(this.toastCtrl, StatusContent);
            return;
          }
        },
        error => this.errorMessage = <any>error
      )
  }

  /**
   * 关闭当前页面的方法
   */
  dismiss() {
    this.viewCtrl.dismiss()
  }

}
