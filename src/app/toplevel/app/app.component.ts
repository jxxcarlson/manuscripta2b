import {Component } from '@angular/core';

import { Constants } from '../../toplevel/constants'
import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'

import { DocumentService } from '../../services/document.service'

interface AppState {
  documents: Document[],
  activeDocument: Document
}



@Component({
  selector: 'router-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor( private documentService: DocumentService,
               private constants: Constants) {

    this.documentService = documentService

    // Set initinal list of documents
    this.documentService.addDocument(this.constants.document1)
    this.documentService.addDocument(this.constants.document2)
    this.documentService.getDocument(177)

  }


}
