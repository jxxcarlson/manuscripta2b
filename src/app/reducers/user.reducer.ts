// https://github.com/ngrx/store
//
export const AUTHORIZE_USER =  'AUTHORIZE_USER'


import { User } from '../interfaces/user.interface'
import { ActionReducer, Action } from '@ngrx/store';

export const userReducer: ActionReducer<Document[]> =
  (state: Document[] = [], action: Action) => {
    switch (action.type) {
      case AUTHORIZE_USER:
        return action.payload
      default:
        return state;
    }
  };
