
// https://github.com/ngrx/store
//
export const SELECT_DOCUMENT =  'SELECT_DOCUMENT'

import { Document } from '../models/document.model'
import { ActionReducer, Action } from '@ngrx/store';

export const activeDocumentReducer: ActionReducer<Document> = (state: any = [], action: Action) => {
  switch (action.type) {
    case SELECT_DOCUMENT:
      return action.payload;
    default:
      return state;
  }
};
