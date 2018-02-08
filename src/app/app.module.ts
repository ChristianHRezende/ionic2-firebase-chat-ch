import { UserService } from './../providers/user/user.service';
import { AuthService } from './../providers/auth/auth.service';
import { Observable } from 'rxjs/Rx';
import { environment } from './../enviroments/enviroments';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CapitalizePipe } from './../pipes/capitalize/capitalize.pipe';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FirebaseAppConfig, AngularFireModule } from 'angularfire2'

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

//Configs on enviroments

@NgModule({
  declarations: [
    CapitalizePipe,
    CustomLoggedHeaderComponent,
    HomePage,
    MyApp,
    SignupPage,
    SigninPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage
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
export class AppModule {
}
