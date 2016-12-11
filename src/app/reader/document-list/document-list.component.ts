import { Component, OnInit, Input} from '@angular/core';
import { Document } from '../../shared/document.model'
import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
import { SET_DOCUMENTS } from '../../state-management/reducers/documents.reducer'
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

    this.documentService.select(document)

    if (document.has_subdocuments) {

      this.store.dispatch({type: SET_DOCUMENTS, payload: document.links.documents})

    }


    if (this.activeDocument.links != undefined &&
      this.activeDocument.links.parent != undefined &&
      this.activeDocument.links.parent.id != undefined) {

      this.parentId = this.activeDocument.links.parent.id
      this.parentTitle = this.activeDocument.links.parent.title

    } else {

      this.parentId = '-1'
      this.parentTitle = '-'

    }


  }

  isActive(document): boolean {

    if ( document.id == this.activeDocument.id) {

      return true

    } else {

      return false
    }

  }


}
