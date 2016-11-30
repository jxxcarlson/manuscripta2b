import { Component, OnInit } from '@angular/core';
import { Document } from '../shared/document.model'
import { DocumentNotificationService } from '../shared/document-notification.service'
import { ApiService } from '../shared/api.service'

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  exampleDocument: Document = new Document ({

    id: '23',

    title: 'Old Latin Document',

    text: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum maximus hendrerit. Duis feugiat egestas dapibus. Aenean pharetra odio in sapien efficitur lobortis. Donec leo dui, efficitur eget nisi ut, pulvinar posuere justo. Morbi eget turpis sapien. Maecenas rutrum ut risus quis porta. Phasellus pharetra efficitur mattis. Cras cursus massa vitae mauris maximus euismod. Quisque ultricies dapibus magna, eu finibus felis mattis ac. Ut vestibulum ex et luctus pretium. Vestibulum egestas, augue volutpat posuere volutpat, diam tortor venenatis ante, at tempus leo mauris vitae lacus. Suspendisse a fermentum ipsum, et efficitur libero. Ut rutrum erat sem, id tempor lectus venenatis non.
`,
    rendered_text: `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum maximus hendrerit. Duis feugiat egestas dapibus. Aenean pharetra odio in sapien efficitur lobortis. Donec leo dui, efficitur eget nisi ut, pulvinar posuere justo. Morbi eget turpis sapien. Maecenas rutrum ut risus quis porta. Phasellus pharetra efficitur mattis. Cras cursus massa vitae mauris maximus euismod. Quisque ultricies dapibus magna, eu finibus felis mattis ac. Ut vestibulum ex et luctus pretium. Vestibulum egestas, augue volutpat posuere volutpat, diam tortor venenatis ante, at tempus leo mauris vitae lacus. Suspendisse a fermentum ipsum, et efficitur libero. Ut rutrum erat sem, id tempor lectus venenatis non.
</p>

<p>
Next observe that the angle of incidence \\(\\theta_1\\) is \\(\\angle AGB\\) and that the angle of refraction \\(\\theta_2\\) is \\(\\angle FGE\\)  
</p>
`
  })

  activeDocument: Document
  parentId: string = '-1'
  parentTitle: string = '-'
  subdocuments: Document[] = []
  documents: Document[] = []

  constructor(private documentService: DocumentNotificationService, private apiService: ApiService) {

    this.documentService = documentService
    this.apiService = apiService

    this.activeDocument = this.exampleDocument
    documentService.announceSelection(this.exampleDocument)

    documentService.documentAnnounced$.subscribe(
      doc => {
        this.activeDocument = doc;
        console.log(`Active document udpated: ${doc.title}`)
      });

  }

  loadParent() {

    console.log(`LOAD ${this.parentId}: ${this.parentTitle}`)

    if (this.parentId != '-1') {

      this.apiService.loadDocAndSubdocuments(this.parentId, this.documents,
        this.subdocuments, (d) => this.activeDocument = d)

      this.documentService.announceDocumentList(this.subdocuments)

      console.log(`### (2b) this.documents.length = ${this.documents.length}`)
      this.documents = [];  this.subdocuments = []
    }


  }

  getParentTitle(): string {

    if (this.activeDocument.links != undefined && this.activeDocument.links.parent != undefined && this.activeDocument.links.parent.id != undefined) {

      this.parentId = this.activeDocument.links.parent.id
      this.parentTitle = this.activeDocument.links.parent.title

    } else {

      this.parentId = '-1'
      this.parentTitle = ''

    }

    return this.parentTitle
  }

  ngOnInit() {
  }


}
