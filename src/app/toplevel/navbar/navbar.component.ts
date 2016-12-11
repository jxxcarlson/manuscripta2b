import { Component, OnInit} from '@angular/core';
import { Observable} from 'rxjs/Rx';
import {NavbarService} from './navbar.service'
import {DocumentService} from '../../services/document.service'
import {Router} from '@angular/router';


import { AppState } from '../../state-management/interfaces/appstate.interface';
import { Store } from '@ngrx/store';
import { UIState } from '../../state-management/interfaces/uistate.interface';

import { uistateReducer, initialState } from '../../state-management/reducers/uistate.reducer'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   navState$: Observable<UIState>
   activeNavSection$: Observable<string>

  constructor(private navbarService: NavbarService,
              private documentService: DocumentService,
              private navStore: Store<AppState>,
              private router: Router
  ) {

    this.navState$ = this.navbarService.navState$
    this.activeNavSection$ = this.navbarService.activeNavSection$


  }

  textColor(target: string, active: string): string {

     if (target == active) {

       return 'red'

     } else {

       return 'white'
     }

  }

  makeFirstDocumentActive (){

    setTimeout(() => {
      this.documentService.selectFirstDocument()
    }, 700)


  }

  getRandomDocuments() {

    let token = ''
    this.documentService.search('random=10')
    this.makeFirstDocumentActive()
    this.router.navigateByUrl('/read', { skipLocationChange: false });
    this.navbarService.updateUIState('read')
  }

  ngOnInit() {

    this.navStore
      .select('uistate')
      .subscribe((val: Observable<UIState>)=> [
        this.navState$ = val,
        this.activeNavSection$ = val['activeNavSection'],
        console.log(`navState changed: ${JSON.stringify(this.navState$)}`)
      ])
  }


    doIt() {

      this.documentService.search('random=10')
      console.log('OK Boss, I got the document')
  }


}
