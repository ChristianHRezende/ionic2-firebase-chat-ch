import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';
import { BaseService } from "../base/base.service";


@Injectable()
export class AuthService extends BaseService {

  constructor(public afAuth: AngularFireAuth) {
    super();
    console.log('Hello Auth Provider')
  }

  createAuthUser(user: { email: string, password: string }): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);

  }

  signInWithEmail(user: { email: string, password: string }): Promise<boolean> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((authState: firebase.User) => {
        return authState != null;
      }).catch(this.handlePromiseError);
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let user = this.afAuth.auth.currentUser;
      //Ternario
      (user != null) ? resolve(true) : reject(false);
    })
  }
}
