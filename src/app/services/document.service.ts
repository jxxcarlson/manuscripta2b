import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';

import {Document} from '../state-management/interfaces/document.interface';
import {Constants} from '../toplevel/constants'

import { QueryParser } from './queryparser.service'

import { ADD_DOCUMENT, SET_DOCUMENTS } from '../state-management/reducers/documents.reducer'
import { SET_DOCUMENTS_AND_SELECT } from '../state-management/reducers/appReducer.reducer'
import { IDENTITY, UPDATE_DOCUMENT } from '../state-management/reducers/activeDocument.reducer'
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

  select(document: Document, token: string = '') {

    let options = this.standardOptions(token)

    if (document.rendered_text == undefined) {

      this.http.get(`${this.apiRoot}/documents/${document.id}`)
        .map(res => res.json())
        .subscribe(payload =>  this.store.dispatch({type: IDENTITY, payload: payload['document']}))

    } else {

      this.store.dispatch({type: IDENTITY, payload: document})

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
    var url = `${this.apiRoot}/documents?${apiQuery}`

    this.store
      .take(1)
      .subscribe((state) => [
        this.http.get(url, this.standardOptions(state.user.token))
          .map((res) => res.json())
          .subscribe(payload =>  [
            this.store.dispatch({type: SET_DOCUMENTS, payload: payload['documents']})
          ])
      ])
  }

  // return the header required by the xdoc API
  standardOptions(token: string) {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'accesstoken': token
    });

    return new RequestOptions({ headers: headers });
  }

  select2(document: Document, token: string) {

    setTimeout(() => {
      this.select(document, token)
    }, 700)
  }

  createDocument(title: string, token:string) {

    console.log(`DS, createDocument -- Making new document with title = ${title}`)

    let params = {
      title: title,
      token: token,
      options: '{}',
      current_document_id: 0,
      parent_document_id: 0
    }

    let url = `${this.apiRoot}/documents`

    return this.http.post(url, params)
      .map((res) => res.json())
      .subscribe(payload =>  [
        console.log(`CREATE DOCUMENT: ${JSON.stringify(payload)}`),
        this.store.dispatch({type: ADD_DOCUMENT, payload: payload['document']}),
        this.select2(payload['document'], token)
      ])

  }


  updateDocument(document: Document, token: string) {

    let params = {
      id: document.id,
      title: document.title,
      text: document.text
    }

    let url = `${this.apiRoot}/documents/${document.id}`
    let options = this.standardOptions(token)

    return this.http.post(url, params , options)
      .map((res) => res.json())
      .subscribe(payload =>  [
        this.store.dispatch({type: UPDATE_DOCUMENT, payload: payload['document']})
      ])

  }

  // moveSubdocument( parent_id: number, subdocument_id: number, command: string, token: string ) {
  moveSubdocument( document: Document, command: string, token: string ) {

    console.log(`ID: ${document.id}`)
    console.log(`Author: ${document.author}`)
    console.log(`Parent: ${document.links.parent.id}`)

    let params = {
      author_name: document.author
    }

    let url = `${this.apiRoot}/documents/${document.links.parent.id}?${command}=${document.id}`
    // Typical URL: http://xdoc-api.herokuapp.com/v1/documents/89?move_down=231
    // Move document 231 down one step in the subdocument list of its parent, document 89

    console.log(`MOVE: url = ${url}`)

    let options = this.standardOptions(token)

    return this.http.post(url, params , options)
      .map((res) => res.json())
      .subscribe(payload =>  [
        console.log(`PAYLOAD (MOVE): ${JSON.stringify(payload)}`),
        this.store.dispatch({
          type: SET_DOCUMENTS_AND_SELECT,
          payload: payload.document.links.documents
        })
      ])
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
    let options = this.standardOptions(token)

    return this.http.get(url , options)
      .map((res) => res.json()['url'])
      .subscribe(payload => callback(payload)
      )
  }

  exportDocumentToLaTex(documentId: number, token: string, callback) {

    let url = `${this.apiRoot}/exportlatex/${documentId}`
    let options = this.standardOptions(token)

    return this.http.get(url , options)
      .map((res) => res.json()['tar_url'])
      .subscribe(payload => callback(payload)
      )
  }


}
