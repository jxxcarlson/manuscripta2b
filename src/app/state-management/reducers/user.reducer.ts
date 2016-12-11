// https://github.com/ngrx/store
//
export const AUTHORIZE_USER =  'AUTHORIZE_USER'
export const GET_TOKEN =  'GET_TOKEN'


import { User } from '../interfaces/user.interface'
import { ActionReducer, Action } from '@ngrx/store';

export const userReducer: ActionReducer<User> =
  (state: User = {id: -1, username: 'nobody', password: '', token: '', signedIn: false}, action: Action) => {
    switch (action.type) {
      case AUTHORIZE_USER:
        return action.payload
      default:
        return state;
    }
  };
