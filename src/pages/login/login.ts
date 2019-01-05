import {Component} from '@angular/core';
import {
  IonicPage, NavController, NavParams,
  ViewController, LoadingController, ToastController
} from 'ionic-angular';
import {Storage} from '@ionic/storage';
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
    public storage: Storage,
    public rest: RestProvider
  ) {
    super()
  }

  login() {
    let loading = super.showLoading(this.loadingCtrl, '登陆中...');
    this.rest.login(this.mobile, this.password)
      .subscribe(f => {
          const {Status, StatusContent, UserId} = f;
          if(Status === 'OK'){
            //处理登录成功的页面跳转
            //你也可以存储接口返回的 token
            this.storage.set('UserId', UserId);
            this.dismiss();
            return ;
          }
          super.showToast(this.toastCtrl, StatusContent);
          loading.dismiss();
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
