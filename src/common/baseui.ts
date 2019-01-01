import {loading, LoadingController} from 'ionic-angular';

export abstract class BaseUI {

  constructor() {
  }

  protected showLoading(loadingCtrl: LoadingController,
                        message: string): loading {
    let loader = loadingCtrl.create({
      content: message,
      dismissOnPageChange: true //页面变化的时候自动关闭 loading
    });
    loader.present();
    return loader;
  }
}
