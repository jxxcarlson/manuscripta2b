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

    title: 'Welcome!',

    text: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum maximus hendrerit. Duis feugiat egestas dapibus. Aenean pharetra odio in sapien efficitur lobortis. Donec leo dui, efficitur eget nisi ut, pulvinar posuere justo. Morbi eget turpis sapien. Maecenas rutrum ut risus quis porta. Phasellus pharetra efficitur mattis. Cras cursus massa vitae mauris maximus euismod. Quisque ultricies dapibus magna, eu finibus felis mattis ac. Ut vestibulum ex et luctus pretium. Vestibulum egestas, augue volutpat posuere volutpat, diam tortor venenatis ante, at tempus leo mauris vitae lacus. Suspendisse a fermentum ipsum, et efficitur libero. Ut rutrum erat sem, id tempor lectus venenatis non.
`,
    rendered_text: `<img src="http://psurl.s3.amazonaws.com/images/jc/bird-b4ba.jpeg" width="300" style="float:left; margin-right:15px; ">
<p style="">Welcome to Manuscripta. With it can write ordinary text, place images, audio, and video — 
even write mathematics.</p>

<p style="margin-top:60px;">
\\[
  \\int_0^1 x^n dx = \\frac{1}{n+1}
\\]
</p>

<p style="margin-top:4em;">To see more content, type &quot;harmonic&quot;
in the search box.</p>

<p>This app is a rewrite (n progress) of <a href="http://www.manuscripta.io">Manuscripta.io</a> in
Angular2.  Still in a primitive state, but we are working on it.</p>

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

      this.apiService.loadDocAndSubdocuments(this.parentId, this.subdocuments, (d) => this.activeDocument = d)

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
      this.parentTitle = '|•|'

    }

    return this.parentTitle
  }

  ngOnInit() {
  }


}
