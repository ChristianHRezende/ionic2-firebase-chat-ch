import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as firebase from 'firebase/app';
import { HomePage } from "../home/home";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
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

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;

    this.userService.userExists(username)
      .first()
      .subscribe((userExiste: boolean) => {
        if (!userExiste) {
          //Create user auth
          this.authService.createAuthUser({ email: formUser.email, password: formUser.password })
            .then((firebaseUser: firebase.User) => {
              delete formUser.password;
              formUser.uId = firebaseUser.uid;

              //Save on db
              this.userService.create(this.signupForm.value)
                .then(() => {
                  console.log("Usuario cadastrado");
                  this.navCtrl.setRoot(HomePage);
                  loading.dismiss();
                }).catch((error: any) => {
                  console.log(error);
                  loading.dismiss();
                  this.showAlert(error);
                });

            }).catch((error: any) => {
              console.log(error);
              loading.dismiss();
              this.showAlert(error);
            });

        } else {
          this.showAlert('Username já utilizado');
          loading.dismiss();

        }
      })

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