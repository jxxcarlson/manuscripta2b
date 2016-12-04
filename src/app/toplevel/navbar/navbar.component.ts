import { Component, OnInit} from '@angular/core';
import { Observable} from 'rxjs/Rx';
import {NavbarService} from './navbar.service'
import {DocumentService} from '../../services/document.service'


import { AppState } from '../../interfaces/appstate.interface';
import { Store } from '@ngrx/store';
import { UIState } from '../../interfaces/uistate.interface';

import { UIStateReducer, initialState } from '../../reducers/uistate.reducer'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   navState$: Observable<UIState>

  constructor(private navbarService: NavbarService,
              private documentService: DocumentService,
              private store: Store<AppState>) {

    // this.navState$ = this.navbarService.navState$

    // store.select(s => s.uistate).subscribe(x => this.navState$ = x)

    this.navState$ = store.select(s => s.uistate)


  }

  getRandomDocuments() {

    this.documentService.search('random=10')
  }

  ngOnInit() {  }


    doIt() {

      this.documentService.search('random=10')
    console.log('OK Boss, I got the document')
  }


}
