
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Document, DocumentList } from './document.model'


@Injectable()
export class ApiService {
  // Resolve HTTP using the constructor
  constructor (private http: Http) {

    console.log('CONSTRUCT: ApiService')
  }
  // private instance variable to hold base url
  // private apiUrl = 'http://localhost:2300/v1';
  private apiUrl = 'http://xdoc-api.herokuapp.com/v1';

  // Fetch document
  // getDocument(id: string) : Observable<Document>{
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

  loadDocument(id: string, documentArray: Array<Document>): void {

    console.log(`loadDocument: ${id}`)

    this.getDocument(id)
      .subscribe(

        doc => documentArray.push(doc)

      )
  }

  loadDocuments(idList: string[] , documentArray: Array<Document>) {

    idList.forEach( (id) => this.loadDocument(id, documentArray) )
  }

}

