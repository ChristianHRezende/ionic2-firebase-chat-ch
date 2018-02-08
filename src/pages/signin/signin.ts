import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
import { HomePage } from './../home/home';
import { SignupPage } from './../signup/signup';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    console.log(this.signinForm.value);
    this.authService.signInWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {
        if (isLogged) {
          this.navCtrl.push(HomePage);
          loading.dismiss();
        }
      })
      .catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      })
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage)
  }

  onHomePage(): void {
    this.navCtrl.push(HomePage).then(() => {
      console.log("BEm vindo a home");
    }).catch(() => {
      console.log("Usuario não autorizado");

    })
  }

  logout(): void {
    this.authService.logout();
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }
}