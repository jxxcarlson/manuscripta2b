import { Component, OnInit, Input} from '@angular/core';
import { Document } from '../../shared/document.model'

import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
import { SELECT_DOCUMENT } from '../../reducers/activeDocument.reducer'

import { DocumentService } from '../../services/document.service'


interface AppState {
  documents: Document[]
  activeDocument: Document
}


@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  //documents: Observable<Document[]>
  //  activeDocument: Observable<Document>

  documents: Document[]
  activeDocument: Document

  subdocuments: Document[] = []
  parentId:string = '-1'
  parentTitle: string = '-'

  documentListTitle:string = 'Documents'

  constructor( private store: Store<AppState>, private documentService: DocumentService) {

    this.documentService = documentService

    store.select(s => s.documents)
      .subscribe( documents => this.documents = documents )

    store.select(s => s.activeDocument)
      .subscribe( activeDocument => this.activeDocument = activeDocument )
  }

  ngOnInit() {

  }

  selectDocument(document) {


    console.log(`clicked => ${document.title}`)
    // this.store.dispatch({type: SELECT_DOCUMENT, payload: document})
    this.documentService.select(document)




    /*
    if (this.activeDocument.has_subdocuments) {
      console.log(`In document-list for ${this.activeDocument.title}, loading subdocuments`)
      this.apiService.loadSubdocuments(this.activeDocument, this.subdocuments)
      // this.documentService.announceDocumentList(this.subdocuments)
      this.subdocuments = []

    }

    if (this.activeDocument.links != undefined && this.activeDocument.links.parent != undefined && this.activeDocument.links.parent.id != undefined) {

      this.parentId = this.activeDocument.links.parent.id
      this.parentTitle = this.activeDocument.links.parent.title

    } else {

      this.parentId = '-1'
      this.parentTitle = '-'

    }

    console.log(`Parent id of ${this.activeDocument.id} = ${this.parentId}`)
    console.log(`Parent title of ${this.activeDocument.id} = ${this.parentTitle}`)

*/
  }

  isActive(document): boolean {

    if ( document == undefined) { return false }

    if ( document == this.activeDocument) {

      return true

    } else {

      return false
    }

  }


}
