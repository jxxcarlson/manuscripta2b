// http://mean.expert/2016/05/21/angular-2-component-communication/

import  {Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Document, DocumentHash, DocumentList } from './document.model'
import { QueryParser } from './queryparser.service'

enum tocModeType {searchResults, documentContents}


@Injectable()
export class DocumentService {


  constructor( private http: Http) {

    console.log(`CONSTRUCT DocumentService`)

    // this.http = http

    var initialDocument: Document = new Document(this.docHash1)
    console.log(`DocumentService: CONSTRUCT INITIAL DOC = ${initialDocument.title}`)

    this.documents = [ initialDocument ]
    this.activeDocument = initialDocument

    this.loadDocument(177)
    this.loadDocuments([76, 60, 78, 59, 226])
  }

  private apiUrl = 'http://xdoc-api.herokuapp.com/v1';

  tocMode: tocModeType = tocModeType.searchResults
  contentsVisible: boolean = false

  // TOC STATE
  searchResults: Array<Document> = this.documents
  documentContents: Array<Document> = []
  activeDocument: Document
  parentDocument:  Document
  // activeDocument:Document = this.documents[0];  // XX:DANGER

  // Initial data
  docHash1 =  new DocumentHash ({
    id: '1', author_id: '11',
    title: 'Welcome',
    text: 'Welcome to Manuscripta.  Use search box to find documents',
    rendered_text: 'Welcome to Manuscripta.  Use search box to find documents',
    links: { documents: [], parent: { } }
    // links: { documents: [], parent: {title: 'foo', id: 22} }
  })

  documents: Array<Document> // = [new Document(this.docHash1) ];

  // (2) THE PROBLEM IS HERE
  getDocument(id: string) : Observable<Document>{
    // ...using get request
    return this.http.get(`${this.apiUrl}/documents/${id}`)
    // return this.http.get('http://xdoc-api.herokuapp.com/v1/documents/' + id)
    // ...and calling .json() on the response to return data
      .map((res:Response) => new Document(res.json()['document']))
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  findDocuments(queryString: string) : Observable<DocumentList>{
    return this.http.get(`${this.apiUrl}/documents?${queryString}`)
      .map((res:Response) => new DocumentList(res.json()))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }


  // http://tutorials.pluralsight.com/front-end-javascript/getting-started-with-angular-2-by-building-a-giphy-search-application
  performSearch(searchTerm: HTMLInputElement): void {

    console.log(`performSearch: ${searchTerm}`)

    var qp: QueryParser = new QueryParser();

    var apiQuery: string = qp.parse(searchTerm.value)

    this.tocMode = tocModeType.searchResults
    this.contentsVisible = false

    // (1) THE PROBLEM IS HERE
    this.findDocuments(apiQuery)
      .subscribe(

        docList => [ console.log(docList),  this.loadDocumentsFromDocumentList(docList.documents)]
      )
  }

  loadDocumentsFromDocumentList(docs: Document[]): void {

    this.documentContents = this.documents
    this.documents = []
    docs.forEach( docHash => [this.loadDocument(docHash.id), console.log(docHash.title)] )
    // this.activeDocument = this.documents[0]
  }

  recallSearchResults(): void {

    this.tocMode = tocModeType.searchResults
    this.documentContents = this.documents
    this.documents = this.searchResults
  }

  recallDocumentContents(): void {

    this.tocMode = tocModeType.documentContents
    this.searchResults = this.documents
    this.documents = this.documentContents
    if (this.documentContents == []) { this.loadSubdocuments(this.activeDocument) }

  }

  loadSubdocuments(doc): void {

    console.log(`loadSubdocuments: ${doc.id} (${doc.title})`)

    this.tocMode = tocModeType.documentContents
    this.contentsVisible = true
    this.searchResults = this.documents
    this.documents = []
    var docs = doc.links.documents || []
    docs.forEach( docHash => [this.loadDocument(docHash.id), console.log(docHash.title)] )
  }

  loadDocument(id) {

    console.log(`loadDocument: ${id}`)

    this.getDocument(id)
      .subscribe(

        doc => this.documents.push(doc)

      )
  }

  assignParent(id) {

    this.getDocument(id)
      .subscribe(

        doc => this.parentDocument = doc

      )
  }

  // Problem here:::
  loadParentDocument() {

    console.log('loadParentDocument')

    var bailOut = this.activeDocument.links.parent == undefined
    if (bailOut) { return }
    bailOut = this.activeDocument.links.parent.id == undefined
    if (bailOut) { return }

    var parentId = this.activeDocument.links.parent.id
    this.assignParent(parentId)

  }

  makeParentDocumentActive(): void {

    this.activeDocument = this.parentDocument
    this.loadSubdocuments(this.activeDocument)
  }

  loadDocuments(idList) {

    idList.forEach( (id) => this.loadDocument(id) )
  }

  selectDocument(doc:Document) {


    if (doc.rendered_text === undefined) {

      this.getDocument(doc.id)
        .subscribe(

          fetchedDoc => [doc.rendered_text = fetchedDoc.rendered_text,
            this.activeDocument = doc, console.log(`(1) selectDocument: ${doc.id} (${doc.title}): ${doc.text}`) ]
        )

    } else {

      this.activeDocument = doc
      console.log(`(2) selectDocument: ${doc.id} (${doc.title}): ${doc.text}`)

      // Problem here:
      this.loadParentDocument()
      doc.has_subdocuments ? this.loadSubdocuments(this.activeDocument): ''
      if (this.parentDocument != undefined && doc.links.parent.title == this.parentDocument.title) {

        console.log('(1*) doc parent: ' + doc.links.parent.title)
        this.tocMode = tocModeType.documentContents

      } else {

        console.log('Did not set this.tocMode = tocModeType.documentContents')
        console.log('(2) doc parent: ' + doc.links.parent.title)
        if (this.parentDocument != undefined) {

          console.log('(2) system parent: ' + this.parentDocument.links.parent.id)
        }
      }
    }
  }


}
