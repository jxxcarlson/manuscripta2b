import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {AppStore} from '../models/appstore.model';
import {Document} from '../models/document.model';

const BASE_URL = 'http://http://xdoc-api.herokuapp.com/v1/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class DocumentService {

  documents: Observable<Array<Document>>;

  constructor(private http: Http, private store: Store<AppStore>) {

    // this.documents = store.select('documents') ;
  }

  loadInitialeDocuments() {
    this.http.get(`${BASE_URL}/documents/467`)
      .map(res => res.json())
      .map(payload => ({ type: 'INITIALIZE_DOCUMENTS', payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  /*
  getDocument(id: number) {
    this.http.get(`${BASE_URL}/documents/${id}`)
      .map((res) => res.json())
      .map(payload => ({ type: 'ADD_DOCUMENT', payload }))
      .subscribe(action => this.store.dispatch(action));
  }
  */

}
