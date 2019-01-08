import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';

  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";


  //notification
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";

  //* 注意：因为课程是主要讲解 ionic 的技术点
  //* 安全性方面你需要自己去做详细的设计和处理
  //* 密码的传递应该在传递参数之前进行加密，并且服务器端也应该进行相应的处理
  //* 具体的问题可以在慕课后台提问交流

  // https://angular.io/tutorial/toh-pt6
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(v => JSON.parse(v) || {})
      .catch(this.handerError)
  }

  private handerError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error.json() || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    return Observable.throw(errMsg);
  }

  login(mobile, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + mobile + "&password=" + password);
  }

  register(mobile, nickname, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlRegister + "?mobile=" + mobile + "&nickname=" + nickname + "&password=" + password);
  }
}
