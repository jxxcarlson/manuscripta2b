import { Constants } from '../toplevel/constants'

import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Store} from '@ngrx/store';
// import {User} from '../../models/user.model'

import {User} from '../interfaces/user.interface'
import {AppState} from '../interfaces/appstate.interface'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AUTHORIZE_USER } from '../reducers/user.reducer'


@Injectable()
export class SigninService {

  constructor (private http: Http,
               private constants : Constants,
               private store: Store<AppState>) {

  }

  signin(username: string, password: string) {

    var url = `${this.constants.apiRoot}/users/${username}?${password}`

    return this.http.get(url)
      .map((res:Response) => res.json())
      .subscribe(payload => [
          console.log(`PAYLOAD: ${payload}`),
          this.store.dispatch({
            type: AUTHORIZE_USER,
            payload: { username: username, password: password,
              id: payload.user_id, token: payload.token, rawToken: payload,
              signedIn: payload.token != null }
          })
        ]
      )


  }

  signout() {

    var nullUser: User = {id: -1, username: 'nobody', password: '', token: '', signedIn: false }

    this.store.dispatch({type: AUTHORIZE_USER, payload: nullUser})
  }


}

