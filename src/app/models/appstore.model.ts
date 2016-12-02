import {Document} from './document.model';

export interface AppStore {
  documents: Document[]
  activeDocument: Document

  defaultDocumentList: Document[]
  tableOfContents: Document[]  // Array of subdocuments of activeDocument (can be empty)
};
