import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database"

import { User } from './../../models/user.model';
@Injectable()
export class UserService {

  users: Observable<User[]>;

  constructor(
    public db: AngularFireDatabase) {
    this.users = this.db.list<User>('users').valueChanges();
  }

  create(user: User): Promise<void> {

    return this.db.object(`/users/${user.uId}`)
      .set(user);
  }

}
