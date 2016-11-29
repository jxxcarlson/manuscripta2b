

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
    documents: Array<Document>


    // (1) Observable document sources
    private documentSelectionAnnounced = new Subject<Document>();
    private searchResultsAnnounced = new Subject<Document[]>();

    // (2) Observable document streams
    documentAnnounced$ = this.documentSelectionAnnounced.asObservable();
    documentListAnnounced$ = this.searchResultsAnnounced.asObservable();


    // (3) Service message commands
    announceSelection(document: Document) {
      this.activeDocument = document
      console.log(`Announced: ${document.title}`)
      this.documentSelectionAnnounced.next(document);
    }

    announceDocumentList(document_list: Document[]) {
      this.documents = document_list
      console.log(`Doc list announced`)
      this.searchResultsAnnounced.next(document_list);
    }


}
