import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database"

import { User } from './../../models/user.model';
import { BaseService } from "../base/base.service";
@Injectable()
export class UserService extends BaseService {

  users: Observable<User[]>;

  constructor(
    public db: AngularFireDatabase) {
    super();
    this.users = this.db.list<User>('users').valueChanges();
  }

  create(user: User): Promise<void> {

    return this.db.object(`/users/${user.uId}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean> {
    return this.db.list('/users', ref => ref.orderByChild('username').equalTo(username)
    ).valueChanges().map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError)
  }

}
