// https://github.com/ngrx/store
//
export const UPDATE_EDIT_TEXT =  'UPDATE_EDIT_TEXT'
export const SET_EDIT_TEXT =  'SET_EDIT_TEXT'


import { Editor } from '../interfaces/editor.interface'
import { ActionReducer, Action } from '@ngrx/store';

export const initialState: Editor = {
  text: '',
}

export const editorReducer: ActionReducer<Editor> =
  (state: Editor = initialState, action: Action) => {
    switch (action.type) {
      case UPDATE_EDIT_TEXT:
        return action.payload
      case SET_EDIT_TEXT:
        return action.payload
      default:
        return initialState;
    }
  };
