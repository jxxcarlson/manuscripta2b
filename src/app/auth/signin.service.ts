import { Constants } from '../toplevel/constants'

import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Store} from '@ngrx/store';
import {User} from '../../models/user.model'

interface AppState {
  documents: Document[],
  activeDocument: Document
  user: User
}

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AUTHORIZE_USER } from '../reducers/user.reducer'


@Injectable()
export class SigninService {

  constructor (private http: Http,
               private constants : Constants,
               private store: Store<AppState>) {

  }

  getToken(username: string, password: string) {

    var url = `${this.constants.apiRoot}/users/${username}?${password}`

    return this.http.get(url)
      .map((res:Response) => res.json())
      .subscribe(payload => [
          this.store.dispatch({
            type: AUTHORIZE_USER,
            payload: { username: username, id: payload.user_id, token: payload.token }
          })
        ]
      )
  }


}

