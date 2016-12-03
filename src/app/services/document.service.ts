import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {AppState} from '../models/appstate.model';
import {Document} from '../models/document.model';
import {Constants} from '../toplevel/constants'

import { QueryParser } from './queryparser.service'

import { ADD_DOCUMENT, SET_DOCUMENTS } from '../reducers/documents.reducer'

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

  // Add existing document to document list
  addDocument(document) {

    this.store.dispatch({type: ADD_DOCUMENT, payload: document})
  }

  // Use document ID to get doc from the server, then append to document list
  getDocument(id: number) {
    this.http.get(`${this.apiRoot}/documents/${id}`)
      .map(res => res.json())
      .subscribe(payload =>  this.store.dispatch({type: ADD_DOCUMENT, payload: payload['document']}))
  }

  // Query the database and replace the current document list
  // with the results of the search
  search (searchTerm: string): void {

    console.log(`performSearch: ${searchTerm}`)
    var qp: QueryParser = new QueryParser();
    var apiQuery: string = qp.parse(searchTerm)

    this.http.get(`${this.apiRoot}/documents?${apiQuery}`)
      .map((res) => res.json())
      .subscribe(payload =>  this.store.dispatch({type: SET_DOCUMENTS, payload: payload['documents']}))

  }

}
