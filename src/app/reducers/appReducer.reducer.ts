// https://github.com/ngrx/store
//
export const SET_DOCUMENTS_AND_SELECT =  'SET_DOCUMENTS_AND_SELECT'


import { Document } from '../interfaces/document.interface'
import { AppState } from '../interfaces/appstate.interface'
import { ActionReducer, Action } from '@ngrx/store';

export const appReducer: ActionReducer<AppState> =
  (state: AppState, action: Action) => {
    switch (action.type) {
      case SET_DOCUMENTS_AND_SELECT:
        //state.documents = action.payload['documents']
        // state.activeDocument = action.payload['activeDocument']
        return action.payload
      default:
        return state;
    }
  };
