import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {User} from '../../interfaces/user.interface'
import {UIState} from '../../interfaces/uistate.interface'
import {UPDATE_NAV_STATE} from '../../reducers/uistate.reducer'

export interface AppState{

  user: User
  uistate: UIState;

  documents: Document[]
  activeDocument: Document

  defaultDocumentList: Document[]
  tableOfContents: Document[]

};


@Injectable()

export class NavbarService {

  navState$: Observable<UIState>

  constructor(private store: Store<AppState>) {

    // this.store =   store.select(s => s.uistate) ;
    this.store =   store
    this.navState$ = this.store.select( s => s.uistate )

  }

  updateUIState(signal: string) {

    console.log(`updateUIState sends signal ${signal}`)
    this.store.dispatch({type: UPDATE_NAV_STATE, payload: {activeNavSection: signal}})
  }



}
