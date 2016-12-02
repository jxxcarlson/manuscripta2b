// https://github.com/ngrx/store
//
export const INITIALIZE_DOCUMENTS =  'INITIALIZE_DOCUMENTS'

import { Document } from '../models/document.model'
import { ActionReducer, Action } from '@ngrx/store';


export const documentsReducer: ActionReducer<Document[]> =
  (state: Document[] = [], action: Action) => {
  switch (action.type) {
    case INITIALIZE_DOCUMENTS:
      return action.payload
    default:
      return state;
  }
};
