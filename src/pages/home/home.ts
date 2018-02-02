import { UserService } from './../../providers/user/user.provider';
import { User } from './../../models/user.model';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;
  constructor(
    public navCtrl: NavController,
    public userService: UserService) {}

  ionViewDidLoad() {
    this.users = this.userService.users;
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage)
  }


  onChatCreate(user:User):void {
    console.log(user)
  }
}
