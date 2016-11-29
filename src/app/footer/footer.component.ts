import { Component, OnInit } from '@angular/core';
import { Document } from '../shared/document.model'
import { DocumentNotificationService } from '../shared/document-notification.service'

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  activeDocument: Document
  id: string



  constructor(documentService: DocumentNotificationService) {

    documentService.documentAnnounced$.subscribe(
      doc => {
        this.activeDocument = doc;
        this.id = doc.id || '0'
        console.log(`FF: Active document received by footer: ${doc.title}`)
      });

  }

  ngOnInit() {
  }

}
