import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';

import {Document} from '../interfaces/document.interface';
import {Constants} from '../toplevel/constants'

import { QueryParser } from './queryparser.service'

import { ADD_DOCUMENT, SET_DOCUMENTS } from '../reducers/documents.reducer'
import { IDENTITY, UPDATE_DOCUMENT } from '../reducers/activeDocument.reducer'

const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

interface AppState {
  documents: Document[],
  activeDocument: Document
}


@Injectable()
export class DocumentService {

  documents: Observable<Array<Document>>;

  constructor(private http: Http,
              private store: Store<AppState>,
              private constants : Constants) {

    this.documents =   store.select(s => s.documents) ;
    console.log(`CONSTRUCT: DOCUMENT_SERVICE`)

  }

  apiRoot = this.constants.apiRoot

  // Add existing document to document list
  addDocument(document) {

    this.store.dispatch({type: ADD_DOCUMENT, payload: document})
  }

  fetchById(id: number) {

    // return this.store.select( s => s.documents ).filter( obj => obj.id == id )[0]
    // return this.store.select( s => s.documents ).map( obj => typeof(obj))
    // return this.store.select( s => s.documents ).find( obj => obj.id == id )
    // return this.store.select(s => s.documents ).map((docs: Observable<Document>) => docs.find((doc: Document) => doc.id === id))

  }

  // Use document ID to get doc from the server, then append to document list
  loadDocument(id: number) {
    this.http.get(`${this.apiRoot}/documents/${id}`)
      .map(res => res.json())
      .subscribe(payload =>  this.store.dispatch({type: ADD_DOCUMENT, payload: payload['document']}))
  }

  // Use document ID to get doc from the server, then append to document list
  loadAndActivateDocument(id: number) {
    this.http.get(`${this.apiRoot}/documents/${id}`)
      .map(res => res.json())
      .subscribe(payload =>  [
        this.store.dispatch({type: ADD_DOCUMENT, payload: payload['document']}),
        this.store.dispatch({type: IDENTITY, payload: payload['document']}),
      ])
  }


  getDocumentAndSubdocuments(id: number) {
    this.http.get(`${this.apiRoot}/documents/${id}`)
      .map(res => res.json())
      .subscribe(payload =>  [
        this.store.dispatch({type: IDENTITY, payload: payload['document']}),
        this.store.dispatch({type: SET_DOCUMENTS, payload: payload.document.links.documents})
      ])
  }

  select(document) {
    if (document.rendered_content == undefined) {

      this.http.get(`${this.apiRoot}/documents/${document.id}`)
        .map(res => res.json())
        .subscribe(payload =>  this.store.dispatch({type: IDENTITY, payload: payload['document']}))

    } else {

      this.store.dispatch({type: IDENTITY, payload: document})

    }

  }

  // Query the database and replace the current document list
  // with the results of the search
  search (searchTerm: string): void {

    var qp: QueryParser = new QueryParser();
    var apiQuery: string = qp.parse(searchTerm)

    this.http.get(`${this.apiRoot}/documents?${apiQuery}&content=all`)
      .map((res) => res.json())
      .subscribe(payload =>  this.store.dispatch({type: SET_DOCUMENTS, payload: payload['documents']}))

  }

  //// EDITOR ////

  /*

   console.log('Doc Api, update enter')

   var parameter = JSON.stringify(params);

   if (params['query_string'] != undefined) {

   var url = envService.read('apiUrl') + '/documents/' + params['id'] + '?' + params['query_string']
   }
   else {

   var url = envService.read('apiUrl') + '/documents/' + params['id']
   }

   var options = {headers: {"accesstoken": UserService.accessToken()}}

   $http.post(url, parameter, options)
   */

  // https://angular.io/docs/ts/latest/guide/server-communication.html

  // console.log(`2. Update document ${document.id}`)

  /*
   var _params = {
   id: scope.id,
   title: scope.editableTitle,
   public: scope.statusPublic,
   text: scope.editText,
   author_name: this.document().author
   }
   */

  updateDocument(document: Document, token: string) {

    let params = {
      id: document.id,
      title: document.title,
      text: document.text
    }

    let url = `${this.apiRoot}/documents/${document.id}`
    console.log(`2: calling documentService.updateDocument with url = ${url}`)
    let headers = new Headers({
      'Content-Type': 'application/json',
      'accesstoken': token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, params , options)
      .map((res) => res.json())
      .subscribe(payload =>  [
        this.store.dispatch({type: UPDATE_DOCUMENT, payload: payload})
      ])

  }

}
