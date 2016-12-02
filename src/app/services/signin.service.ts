import { Constants } from '../toplevel/constants'


// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Document, DocumentList } from '../shared/document.model'
import { QueryParser } from './queryparser.service'
import {constants} from "os";


@Injectable()
export class SigninService {

  constructor (private http: Http, private constants : Constants) {

  }

  getToken(username: string, password: string) : Observable<string>{

    var url = `${this.constants.apiRoot}/users/${username}?${password}`
    console.log(`getToken called with url ${url}`)

    return this.http.get(url)
      .map((res:Response) => console.log(JSON.stringify(res.json)))

  }

 test() {

   this.getToken('jc', 'lobo4795')
 }

}

