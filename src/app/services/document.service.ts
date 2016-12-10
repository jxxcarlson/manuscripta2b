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
import {SET_EDIT_TEXT} from '../reducers/editor.reducer'

const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };


import {AppState} from '../interfaces/appstate.interface'


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

  standarOptions(token: string) {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'accesstoken': token
    });
    return new RequestOptions({ headers: headers });
  }


  updateDocument(document: Document, token: string) {

    let params = {
      id: document.id,
      title: document.title,
      text: document.text
    }

    let url = `${this.apiRoot}/documents/${document.id}`
    let options = this.standarOptions(token)

    return this.http.post(url, params , options)
      .map((res) => res.json())
      .subscribe(payload =>  [
        this.store.dispatch({type: UPDATE_DOCUMENT, payload: payload['document']})
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
    let options = this.standarOptions(token)

    return this.http.get(url , options)
      .map((res) => res.json()['url'])
      .subscribe(payload => callback(payload)
      )
  }

  exportDocumentToLaTex(documentId: number, token: string, callback) {

    let url = `${this.apiRoot}/exportlatex/${documentId}`
    let options = this.standarOptions(token)

    return this.http.get(url , options)
      .map((res) => res.json()['tar_url'])
      .subscribe(payload => callback(payload)
      )
  }


/*

 // url to send to server to generate latex:
 var url = envService.read('apiUrl') + '/exportlatex/' + id
 // We already know the url of the tar file with the exported document:
 scope.exportLatexUrl = "http://psurl.s3.amazonaws.com/latex/" + id + ".tar"
 var options = {headers: {"accesstoken": UserService.accessToken()}}
 return $http.get(url, options)
 .then(function (response) {
 // promise is fulfilled
 deferred.resolve(response.data);
 var jsonData = response.data
 var  url = jsonData['tar_url']
 // return the title of the document. This is the signal
 // that the tar file is ready
 scope.title = DocumentService.document().title
 // promise is returned
 return deferred.promise;
 }, function (response) {
 // the following line rejects the promise
 deferred.reject(response);
 // promise is returned
 return deferred.promise;
 })
 */


}
