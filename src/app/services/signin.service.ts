
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Document, DocumentList } from '../shared/document.model'
import { QueryParser } from './queryparser.service'


@Injectable()
export class SigninService {

  constructor (private http: Http) {

  }

  // private apiUrl = 'http://xdoc-api.herokuapp.com/v1';
  private apiUrl = 'http://localhost:2300/v1';

  getToken(username: string, password: string) : Observable<string>{
    console.log(`getToken called with username ${username},calling ... `)
    return this.http.get(`${this.apiUrl}/users/${username}?${password}`)
      .map((res:Response) => alert(res.json))

  }

 test() {

   this.getToken('jc', 'logo4795')
 }

}

