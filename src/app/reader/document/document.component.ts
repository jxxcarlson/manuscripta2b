import { Component, OnInit } from '@angular/core';
import { Document } from '../../shared/document.model'

import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
import { INITIALIZE_DOCUMENTS } from '../../reducers/documents.reducer'
interface AppState {
  documents: Document[],
  activeDocument: Document
}

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  exampleDocument: Document = new Document ({

    id: '23',

    title: '',

    text: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum maximus hendrerit. Duis feugiat egestas dapibus. Aenean pharetra odio in sapien efficitur lobortis. Donec leo dui, efficitur eget nisi ut, pulvinar posuere justo. Morbi eget turpis sapien. Maecenas rutrum ut risus quis porta. Phasellus pharetra efficitur mattis. Cras cursus massa vitae mauris maximus euismod. Quisque ultricies dapibus magna, eu finibus felis mattis ac. Ut vestibulum ex et luctus pretium. Vestibulum egestas, augue volutpat posuere volutpat, diam tortor venenatis ante, at tempus leo mauris vitae lacus. Suspendisse a fermentum ipsum, et efficitur libero. Ut rutrum erat sem, id tempor lectus venenatis non.
`,
    rendered_text: `<img src="http://psurl.s3.amazonaws.com/images/jc/1920px-Great_Wave_off_Kanagawa2-fe2b.jpg" width="600" style="float:left; margin-right:15px; ">
`
  })

  activeDocument: Document
  parentId: string = '-1'
  parentTitle: string = '-'
  subdocuments: Document[] = []
  documents: Observable<Document[]>

  constructor(private store: Store<AppState>) {

    store.select(s => s.activeDocument)
      .subscribe( activeDocument => this.activeDocument = activeDocument)

  }

  loadParent() {

    console.log(`LOAD ${this.parentId}: ${this.parentTitle}`)

    if (this.parentId != '-1') {

      //this.apiService.loadDocAndSubdocuments(this.parentId, this.subdocuments, (d) => this.activeDocument = d)

      // this.documentService.announceDocumentList(this.subdocuments)

      // console.log(`### (2b) this.documents.length = ${this.documents.length}`)
      // this.documents = [];  this.subdocuments = []
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
