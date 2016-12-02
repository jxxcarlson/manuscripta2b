import {Document} from './document.model';

export interface AppStore {
  documents: Document[]
  activeDocument: Document

  activeSection: string // Read, Compose, Image, About, Home
  searchScope: string; // mydocs, otherdocs

  defaultDocumentList: Document[]
  tableOfContents: Document[]  // Array of subdocuments of activeDocument (can be empty)
};
