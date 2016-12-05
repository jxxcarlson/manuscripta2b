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

  constructor( private navStore: Store<UIState>) {

    console.log(`CONSTRUCT: NAVBAR_SERVICE`)

    this.navStore = navStore // .select(s => s.activeNavSection)

    const subscriber = this.navStore.select('uistate')
      .subscribe(val =>  console.log(`VALUE FROM NAV STORE: ${JSON.stringify(val)}`)
      );

  }

  updateUIState(signal: string) {

    console.log(`updateUIState sends signal ${signal}`)
    this.navStore.dispatch({type: UPDATE_NAV_STATE, payload: {activeNavSection: signal}})
  }



}
