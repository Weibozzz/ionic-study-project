import {Component} from '@angular/core';
import {
  IonicPage, NavController, NavParams,
  ToastController,
  ViewController, LoadingController
} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from '../../providers/rest/rest';

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
export class RegisterPage extends BaseUI {
  mobile: any;
  nickname: any;
  password: any;
  confirmPassword: any;
  errorMessage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public rest: RestProvider,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController
  ) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  gotoLogin() {
    this.navCtrl.pop()
  }

  doRegister() {
    if (this.password !== this.confirmPassword) {
      super.showToast(this.toastCtrl, '两次输入密码不一致。')
      return;
    }
    let loading = super.showLoading(this.loadingCtrl, '注册中...');
    this.rest.register(this.mobile, this.nickname, this.password)
      .subscribe(
        f=>{
          loading.dismiss();
          const {Status, StatusContent, UserId} = f;
          if(Status === 'OK'){
            super.showToast(this.toastCtrl, '注册成功');
            this.dismiss();
            return ;
          }
          super.showToast(this.toastCtrl, StatusContent);
        },
        error => this.errorMessage = <any>error
      )
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }
}
