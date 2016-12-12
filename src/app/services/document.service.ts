import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store'
// import {Observable} from "rxjs/Observable";
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Document} from '../state-management/interfaces/document.interface';
import {Constants} from '../toplevel/constants'

import { QueryParser } from './queryparser.service'

import { ADD_DOCUMENT, SET_DOCUMENTS } from '../state-management/reducers/documents.reducer'
import { SET_DOCUMENTS_AND_SELECT, ADD_DOCUMENT_AND_SELECT } from '../state-management/reducers/appReducer.reducer'
import { SELECT_DOCUMENT, UPDATE_DOCUMENT } from '../state-management/reducers/activeDocument.reducer'
import {SET_EDIT_TEXT} from '../state-management/reducers/editor.reducer'

const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };


import {AppState} from '../state-management/interfaces/appstate.interface'


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


  // Use document ID to get doc from the server, then append to document list
  loadDocument(id: number) {

    let url = `${this.apiRoot}/documents/${id}`

    this.store.select(state=> state.user.token)
      .flatMap( token => this.http.get(url, this.standardOptions(token))
        .map((res) => res.json())
        .do(payload => this.store.dispatch({type: ADD_DOCUMENT, payload: payload['document']}))
      ).subscribe()

  }

  // Use document ID to get doc from the server, then append to document list
  loadAndActivateDocument(id: number) {

    let url = `${this.apiRoot}/documents/${id}`

    this.store.select(state=> state.user.token)
      .flatMap( token => this.http.get(url, this.standardOptions(token))
        .map((res) => res.json())
        .do(payload =>[
          this.store.dispatch({type: ADD_DOCUMENT, payload: payload['document']}),
          this.store.dispatch({type: SELECT_DOCUMENT, payload: payload['document']})
        ])
      ).subscribe()

  }


  getDocumentAndSubdocuments(id: number) {

    let url = `${this.apiRoot}/documents/${id}`

    this.store.select(state=> state.user.token)
      .flatMap( token => this.http.get(url, this.standardOptions(token))
        .map((res) => res.json())
        .do(payload =>[
          this.store.dispatch({type: SELECT_DOCUMENT, payload: payload['document']}),
          this.store.dispatch({type: SET_DOCUMENTS, payload: payload.document.links.documents})
        ])
      ).subscribe()

  }

  select(document: Document) {

    if (document.rendered_text == undefined) {

      let url = `${this.apiRoot}/documents/${document.id}`

      this.store.select(state=> state.user.token)
        .flatMap( token => this.http.get(url, this.standardOptions(token))
          .map((res) => res.json())
          .do(payload =>
            this.store.dispatch({type: SELECT_DOCUMENT, payload: payload['document']}))
        ).subscribe()

    } else {

      this.store.dispatch({type: SELECT_DOCUMENT, payload: document})

    }

  }

  selectFirstDocument() {

    this.store.select('documents')
      .take(1)
      .subscribe( (docs: Document[]) => [
        this.select(docs[0])
      ])
  }

  // Query the database and replace the current document list
  // with the results of the search
  search (searchTerm: string): void {

    var qp: QueryParser = new QueryParser();
    var apiQuery: string = qp.parse(searchTerm)
    var url: string = `${this.apiRoot}/documents?${apiQuery}`

    this.store.select(state=> state.user.token)
      .flatMap( token => this.http.get(url, this.standardOptions(token))
        .map((res) => res.json())
        .do(payload => [
          this.store.dispatch({type: SET_DOCUMENTS, payload: payload['documents']}),
          this.select(payload['documents'][0])
        ])
      ).subscribe()
  }


  // return the header required by the xdoc API
  standardOptions(token: string): RequestOptions {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'accesstoken': token
    });

    return new RequestOptions({ headers: headers });
  }

  select2(document: Document) {

    setTimeout(() => {
      this.select(document)
    }, 700)
  }


  createDocument(params) {

    let url = `${this.apiRoot}/documents`

    this.store.select(state=> state.user.token)
      .flatMap( token => this.http.post(url, Object.assign(params, {token: token}))
        .map((res) => res.json())
        .do(payload => [
          this.store.dispatch({type: ADD_DOCUMENT, payload: payload['document']}),
          this.select(payload['document'])
        ])
      ).subscribe()
  }


  updateDocument(document: Document) {

    let params = {
      id: document.id,
      title: document.title,
      text: document.text
    }

    let url = `${this.apiRoot}/documents/${document.id}`

    this.store.select(state=> state.user.token)
      .flatMap( token => this.http.post(url, params, this.standardOptions(token))
        .map((res) => res.json())
        .do(payload => this.store.dispatch({type: UPDATE_DOCUMENT, payload: payload['document']}))
      ).subscribe()

  }

  togglePublic(document: Document) {

    let params = {
      id: document.id,
      public: !document.public,
    }

    let url = `${this.apiRoot}/documents/${document.id}`

    this.store.select(state=> state.user.token)
      .flatMap( token => this.http.post(url, params, this.standardOptions(token))
        .map((res) => res.json())
        .do(payload => this.store.dispatch({type: UPDATE_DOCUMENT, payload: payload['document']}))
      ).subscribe()

  }


  // moveSubdocument( parent_id: number, subdocument_id: number, command: string, token: string ) {
  moveSubdocument( document: Document, command: string ) {

    console.log(`ID: ${document.id}`)
    console.log(`Author: ${document.author}`)
    console.log(`Parent: ${document.links.parent.id}`)

    let params = {
      author_name: document.author
    }

    let url = `${this.apiRoot}/documents/${document.links.parent.id}?${command}=${document.id}`
    // Typical URL: http://xdoc-api.herokuapp.com/v1/documents/89?move_down=231
    // Move document 231 down one step in the subdocument list of its parent, document 89

    console.log(`moveSubdocument, url = ${url}`)

    this.store.select(state=> state.user.token)
      .flatMap( token => this.http.post(url, params, this.standardOptions(token))
        .map((res) => res.json())
        .do(payload => this.store.dispatch({
          type: SET_DOCUMENTS,
          payload: payload.document.links.documents
        }))
      ).subscribe()
  }


  /// TEXT FUNCTIONS ///


  setTextFromActiveDocument() {

    this.store.select('activeDocument')
      .take(1)
      .subscribe( (doc: Document) => [
        this.store.dispatch({type:SET_EDIT_TEXT, payload: doc.text})
      ])
  }

  updateTextOfActiveDocument(text) {

    this.store.select('activeDocument')
      .take(1)
      .subscribe( (doc: Document) => [
        doc.text = text,
        // console.log(`EDIT TEXT: ${doc.text}`)
        this.store.dispatch({type:UPDATE_DOCUMENT, payload: doc})
      ])
  }

  applyActiveDocument(callback) {

    this.store.select('activeDocument')
      .take(1)
      .subscribe( (doc: Document) => [
       callback(doc)
      ])
  }

  // Request a url for a print version of
  // the given the ID of document
  printDocument(documentId: number, token: string, callback) {

    let url = `${this.apiRoot}/printdocument/${documentId}`

    this.store.select(state=> state.user.token)
      .flatMap( token => this.http.get(url, this.standardOptions(token))
        .map((res) => res.json()['url'])
        .do(payload => callback(payload))
      ).subscribe()

  }

  exportDocumentToLaTex(documentId: number, token: string, callback) {

    let url = `${this.apiRoot}/exportlatex/${documentId}`

    this.store.select(state=> state.user.token)
      .flatMap( token => this.http.get(url, this.standardOptions(token))
        .map((res) => res.json()['tar_url'])
        .do(payload => callback(payload))
      ).subscribe()

  }


}
