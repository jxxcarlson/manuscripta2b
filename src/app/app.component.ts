import { Component } from '@angular/core';
import { Document } from './shared/document.model';
import { ApiService } from './shared/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  d1: Document = new Document( {

    id: 1,
    title: 'Introductory Magick',
    text: 'It _is_ magical!',
    rendered_text: '<p>It <i>is</i> magical!</p>'
  })

  d2: Document = new Document( {

    id: 2,
    title: 'Chemical Stories',
    text: 'It all began with *Democritus*',
    rendered_text: '<p>It all began with <b>Democritus</b></p>  '
  })

  testDocuments: Document[] = [ this.d1, this.d2 ]

  constructor(private apiService: ApiService) {

    this.apiService = apiService

    this.apiService.loadDocument('177', this.testDocuments)

    this.apiService.loadDocuments(['76', '60', '78', '59', '226'], this.testDocuments)

  }






}
