import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatPage } from '../pages/chat/chat';
import { NotificationsPage } from '../pages/notifications/notifications';
import { MorePage } from '../pages/more/more';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { RestProvider } from '../providers/rest/rest';
import {UserPage} from "../pages/user/user";

@NgModule({
  declarations: [
    MyApp,
    DiscoveryPage,
    ChatPage,
    NotificationsPage,
    HomePage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiscoveryPage,
    ChatPage,
    NotificationsPage,
    HomePage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
