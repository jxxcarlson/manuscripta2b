import { Component, OnInit, Input} from '@angular/core';
import { Document } from '../shared/document.model'
import { DocumentNotificationService } from '../shared/document-notification.service'

@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Input() documents: Document[]

  activeDocument: Document

  documentListTitle:string = 'Documents'

  constructor( private documentService: DocumentNotificationService ) {

    documentService.documentListAnnounced$.subscribe(
      docList => {
        this.documents = docList;
        console.log(`Active document updated:`)
      })
  }

  ngOnInit() {


  }

  selectDocument(document) {
    console.log(`clicked => ${document.title}`)
    this.activeDocument = document
    this.documentService.announceSelection(document)
  }

  isActive(document: Document): boolean {

    if ( document == undefined) {

      return false

    }

    if ( document == this.activeDocument) {

      return true

    } else {

      return false
    }

  }


}
