import {Document} from './document.interface';
import {User} from './user.interface';
import {UIState} from './uistate.interface';

export interface AppState{

  user: User
  uistate: UIState;

  documents: Document[]
  activeDocument: Document

  defaultDocumentList: Document[]
  tableOfContents: Document[]

};
