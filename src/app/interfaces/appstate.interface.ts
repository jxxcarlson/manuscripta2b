import {Document} from './document.interface';
import {User} from './user.interface';
import {UIState} from './uistate.interface';
import {Editor} from './editor.interface';

export interface AppState{

  user: User
  uistate: UIState;

  documents: Document[]
  activeDocument: Document

  editor: Editor

  defaultDocumentList: Document[]
  tableOfContents: Document[]

};
