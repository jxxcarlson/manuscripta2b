import { Component, OnInit} from '@angular/core';
import { Observable} from 'rxjs/Rx';
import {NavbarService} from './navbar.service'

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

  constructor(private navbarService: NavbarService) {

    this.navState$ = this.navbarService.navState$

    // store.select(s => s.uistate).subscribe(x => [console.log(JSON.stringify(x)), this.uistate = x ])

  }

  ngOnInit() {  }


  doIt() {

    console.log('OK Boss, I got the document')
  }


}
