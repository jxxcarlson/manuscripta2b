import {Document} from './document.model';

export interface AppStore {

  apiToken: string // User obtains this by signing in

  documents: Document[]
  activeDocument: Document

  activeSection: string // Read, Compose, Image, About, Home
  searchScope: string; // mydocs, otherdocs, alldocs

  defaultDocumentList: Document[]
  tableOfContents: Document[]  // Array of subdocuments of activeDocument (can be empty)

};
