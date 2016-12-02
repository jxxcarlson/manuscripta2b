import { Component, OnInit } from '@angular/core';
import { Document } from '../../shared/document.model'
import { DocumentNotificationService } from '../../services/document-notification.service'

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  activeDocument: Document
  id: string
  has_subdocuments: boolean



  constructor(documentService: DocumentNotificationService) {

    documentService.documentAnnounced$.subscribe(
      doc => {
        this.activeDocument = doc;
        this.id = doc.id || '0'
        this.has_subdocuments = doc.has_subdocuments || false
        console.log(`FF: Active document received by footer: ${doc.title}`)
      });

  }

  ngOnInit() {
  }

}
