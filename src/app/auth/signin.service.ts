import { Constants } from '../toplevel/constants'

import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class SigninService {

  constructor (private http: Http, private constants : Constants) {

  }

  getToken(username: string, password: string) : Observable<string>{

    var url = `${this.constants.apiRoot}/users/${username}?${password}`

    console.log(`Calling api server with url ${url}`)

    return this.http.get(url)
      .map((res:Response) => JSON.stringify(res.json()))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

 test() {

   this.getToken('jc', 'lobo4795')
     .subscribe( (x) => console.log(`Response: ${x}`))

 }

}

