import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
import {Params} from '@angular/router'
import {DocumentService} from '../../services/document.service'



import {DocumentListModule} from '../document-list/document-list.module'

// import {NavbarService} from '../,,/toplevel/navbar/navbar.service'
import {NavbarService} from '../../toplevel/navbar/navbar.service'


import { SET_DOCUMENTS } from '../../reducers/documents.reducer'
import {ActivatedRoute, Router} from "@angular/router";
interface AppState {
  documents: Document[]
  activeDocument: Document
}


@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  documents: Observable<Document[]>
  documentId: string

  constructor(private store: Store<AppState>,
              private navbarService: NavbarService,
              private route: ActivatedRoute,
              private  documentService: DocumentService,
              private router: Router) {

    this.store = store
    this.navbarService = navbarService

  }

  ngOnInit() {

    this.documentId = this.route.params['_value']['id']
    if (this.documentId != undefined) {
      // this.documentService.loadAndActivateDocument(parseInt(this.documentId))
      this.documentService.getDocumentAndSubdocuments(parseInt(this.documentId))
    }

    this.navbarService.updateUIState('read')

  }

}
