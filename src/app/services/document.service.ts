import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {AppState} from '../models/appstate.model';
import {Document} from '../models/document.model';
import {Constants} from '../toplevel/constants'

import { ADD_DOCUMENT } from '../reducers/documents.reducer'
import { SELECT_DOCUMENT } from '../reducers/activeDocument.reducer'

const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class DocumentService {

  documents: Observable<Array<Document>>;

  constructor(private http: Http,
              private store: Store<AppState>,
              private constants : Constants) {

    this.documents =   store.select(s => s.documents) ;

  }

  apiRoot = this.constants.apiRoot

  addDocument(document) {

    this.store.dispatch({type: ADD_DOCUMENT, payload: document})
  }

  loadDocument(id: number) {
    this.http.get(`${this.apiRoot}/documents/${id}`)
      .map(res => res.json())
      .map(payload => ({ type: 'ADD_DOCUMENT', payload: payload }))
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
