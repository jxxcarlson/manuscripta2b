import { Component, OnInit, Input} from '@angular/core';
import { Document } from '../shared/document.model'
import { DocumentNotificationService } from '../shared/document-notification.service'
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Input() documents: Document[]

  activeDocument: Document
  subdocuments: Document[] = []
  parentId:string = '-1'
  parentTitle: string = '-'

  documentListTitle:string = 'Documents'

  constructor( private documentService: DocumentNotificationService, private apiService: ApiService) {

    documentService.documentListAnnounced$.subscribe(
      docList => {
        this.documents = docList;
        console.log(`Active document updated:`)
      })

    this.documentService = documentService
    this.apiService = apiService
  }

  ngOnInit() {


  }

  selectDocument(document) {
    console.log(`clicked => ${document.title}`)
    this.activeDocument = document
    this.documentService.announceSelection(document)

    if (this.activeDocument.has_subdocuments) {
      this.apiService.loadSubdocuments(this.activeDocument, this.subdocuments)
      this.documentService.announceDocumentList(this.subdocuments)
      this.subdocuments = []

    }

    if (this.activeDocument.links.parent != undefined && this.activeDocument.links.parent.id != undefined) {

      this.parentId = this.activeDocument.links.parent.id
      this.parentTitle = this.activeDocument.links.parent.title

    } else {

      this.parentId = '-1'
      this.parentTitle = '-'

    }

    console.log(`Parent id of ${this.activeDocument.id} = ${this.parentId}`)
    console.log(`Parent title of ${this.activeDocument.id} = ${this.parentTitle}`)


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
