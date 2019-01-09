import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from '../../providers/rest/rest';
import {UserPage} from "../user/user";


/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {
  public notLogin: boolean = true;
  public logined: boolean = false;
  public headface: string;
  userinfo: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public rest: RestProvider,
    public loadCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    super()
  }

  showModal() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  ionViewDidEnter() {
    this.loadUserPage()
  }

  loadUserPage() {
    this.storage.get('UserId').then(val => {
      if (val != null) {
        let loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.userinfo = userinfo;
              this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
              this.notLogin = false;
              this.logined = true;
              loading.dismiss();
            }
          );
        return;
      }
      this.notLogin = true
      this.logined = false
    })
  }

  gotoUserPage(){
    this.navCtrl.push(UserPage)
  }
}
