import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'

// import {NavbarService} from '../,,/toplevel/navbar/navbar.service'
import {NavbarService} from '../../toplevel/navbar/navbar.service'


import { SET_DOCUMENTS } from '../../reducers/documents.reducer'
interface AppState {
  documents: Document[]
  activeDocument: Document
}


@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  documents: Observable<Document[]>

  constructor(private store: Store<AppState>,
              private navbarService: NavbarService) {

    this.store = store
    this.navbarService = navbarService

  }

  ngOnInit() {

    console.log('INIT: READ')

    this.navbarService.updateUIState('read')
  }

}
