import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicPage, NavController, NavParams, ActionSheetController, Platform, ToastController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";


//导入四个外部加载进来的组件，具体的安装方法在 09-01 章节
import {File} from '@ionic-native/file';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import {Camera, CameraOptions} from '@ionic-native/camera';

declare var cordova: any; //导入第三方的库定义到 TS 项目中
/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {
  userId: string;
  errorMessage: string;
  lastImage: string = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public camera: Camera,
              public transfer: Transfer,
              public file: File,
              public filePath: FilePath,
              public toastCtrl: ToastController,
  ) {
    super()
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userId = val;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeadfacePage');
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从图片库选择',
          handler: () => {
            // this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            this.takePicture();
          }
        },
        {
          text: '使用相机',
          handler: () => {

          }
        },
        {
          text: '取消',
          role: 'cancel',
        },
      ]
    })
    actionSheet.present();
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      super.showToast(this.toastCtrl,imageData)
    }, (err) => {
      // Handle error
      super.showToast(this.toastCtrl, err)
    });
  }
/*  takePicture(sourceType) {
    var options = {
      quality: 100, //图片的质量
      sourceType: sourceType,
      saveToPhotoAlbum: false, //是否保存拍摄的照片到相册中去
      correctOrientation: true //是否纠正拍摄的照片的方向
    };

    this.camera.getPicture(options).then((imagePath) => {
      super.showToast(this.toastCtrl, imagePath);

      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath) //获取 android 平台下的真实路径
          .then(filePath => {
            //获取正确的路径
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            //获取正确的文件名
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      }
    }, (err) => {
      // Handle error
      console.warn('err', err)
      super.showToast(this.toastCtrl, err+ ' err');
    });
  }*/

  //将获取到的图片或者相机拍摄到的图片进行一下另存为，用于后期的图片上传使用
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      super.showToast(this.toastCtrl, "存储图片到本地图库出现错误。");
    });
  }

  //为文件生成一个新的文件名
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg"; //拼接文件名
    return newFileName;
  }
}
