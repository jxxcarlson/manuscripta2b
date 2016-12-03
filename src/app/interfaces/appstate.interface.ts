import {Document} from './document.interface';
import {User} from './user.interface';

export interface AppState{

  user: User
  documents: Document[]
  activeDocument: Document

  activeSection: string // Read, Compose, Image, About, Home
  searchScope: string; // mydocs, otherdocs, alldocs

  defaultDocumentList: Document[]
  tableOfContents: Document[]  // Array of subdocuments of activeDocument (can be empty)

};
