import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";

import {AppState} from '../state-management/interfaces/appstate.interface'
import {User} from '../state-management/interfaces/user.interface'

@Injectable()
export class UserService {

  user$: Observable<User>;

  constructor(private store: Store<AppState>) {

    this.user$ = store.select(s => s.user);

    console.log(`CONSTRUCT: USER_SERVICE with token ??`)

  }

  getToken(token) {

    this.user$.map(u => token = u.token)


  }

}
