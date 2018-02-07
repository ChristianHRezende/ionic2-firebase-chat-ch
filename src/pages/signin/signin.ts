import { SignupPage } from './../signup/signup';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth/auth';
import { UserService } from './../../providers/user/user.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/first';

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

    console.log(this.signinForm.value);
    
  }

  onSignup():void{
    this.navCtrl.push(SignupPage)
  }
}