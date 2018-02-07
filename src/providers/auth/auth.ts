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
}
