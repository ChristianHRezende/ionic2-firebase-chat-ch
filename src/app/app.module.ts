import { UserService } from './../providers/user/user.provider';
import { SignupPage } from './../pages/signup/signup';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FirebaseAppConfig, AngularFireModule } from 'angularfire2'

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../providers/auth/auth';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyD_MEZNW1cspifCypiEZ3u6NUb_J4IhsEM",
  authDomain: "ionic2-firebase-chat-f24ae.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-f24ae.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-f24ae.appspot.com",
  messagingSenderId: "603758265420"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig), 
    AngularFireDatabaseModule,
    AngularFireAuthModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    AuthService,
    AngularFireAuth
  ]
})
export class AppModule { }
