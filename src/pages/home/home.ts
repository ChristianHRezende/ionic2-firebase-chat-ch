import { UserService } from './../../providers/user/user.service';
import { AuthService } from './../../providers/auth/auth.service';
import { User } from './../../models/user.model';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {

  users: Observable<User[]>;
  view:string = 'chats';
  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public authService: AuthService) { }

  ionViewCanEnter(): Promise<boolean> {
    //Testa se usuario esta logado
    return this.authService.authenticated;
  }
  ionViewDidLoad() {
    //Carrega itens
    this.users = this.userService.users;
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage)
  }


  onChatCreate(user: User): void {
    console.log(user)
  }
}
