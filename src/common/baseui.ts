import { LoadingController, ToastController} from 'ionic-angular';

export abstract class BaseUI {

  constructor() {
  }

  protected showLoading(loadingCtrl: LoadingController,
                        message: string) {
    let loader = loadingCtrl.create({
      content: message,
      dismissOnPageChange: true //页面变化的时候自动关闭 loading
    });
    loader.present();
    return loader;
  }

  protected  showToast(toastCtrl: ToastController, message:string) {
    const toast = toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    return toast;
  }
}
