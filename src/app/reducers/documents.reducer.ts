// https://github.com/ngrx/store
//
export const SET_DOCUMENTS =  'SET_DOCUMENTS'
export const SET_DOCUMENTS_AND_SELECT =  'SET_DOCUMENTS_AND_SELECT'
export const ADD_DOCUMENT =  'ADD_DOCUMENT'

import { Document } from '../interfaces/document.interface'
import { ActionReducer, Action } from '@ngrx/store';

export const documentsReducer: ActionReducer<Document[]> =
  (state: Document[] = [], action: Action) => {
  switch (action.type) {
    case SET_DOCUMENTS:
      return action.payload
    case SET_DOCUMENTS_AND_SELECT:
      console.log(action.payload[0])
      return action.payload
    case ADD_DOCUMENT:
      return [ ...state, action.payload]

    default:
      return state;
  }
};
