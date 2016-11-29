

import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Document, DocumentList }  from './document.model';

@Injectable()
export class DocumentNotificationService {

    // This is the canonical source for
    // the applicatin state
    activeDocument: Document

    // Lists of documents
    activeTableOfContents: Array<Document>
    searchResultsList: Array<Document>
    hotList: Array<Document>
    documents: DocumentList


    // Observable document sources
    private documentSelectionAnnounced = new Subject<Document>();

    // Observable document streams
    documentAnnounced$ = this.documentSelectionAnnounced.asObservable();


    // Service message commands
    announceSelection(document: Document) {
      this.activeDocument = document
      console.log(`Announced: ${document.title}`)
      this.documentSelectionAnnounced.next(document);
    }


}
