import { Component, OnInit } from '@angular/core';
import { UPDATE_NAV_STATE } from '../../reducers/uistate.reducer'

import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
interface AppState {
  documents: Document[],
  activeDocument: Document
}


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    console.log('INIT: ABOUT')
    this.store.dispatch({type: UPDATE_NAV_STATE, payload: {activeNavSection: 'about'}})
  }

}


