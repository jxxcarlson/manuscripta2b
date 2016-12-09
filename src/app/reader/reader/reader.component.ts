import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
import {Params} from '@angular/router'
import {DocumentService} from '../../services/document.service'
import {UserService} from '../../services/user.service'



import {DocumentListModule} from '../document-list/document-list.module'

// import {NavbarService} from '../,,/toplevel/navbar/navbar.service'
import {NavbarService} from '../../toplevel/navbar/navbar.service'


import { SET_DOCUMENTS } from '../../reducers/documents.reducer'
import {ActivatedRoute, Router} from "@angular/router";
import {AppState} from '../../interfaces/appstate.interface'
import {UIState} from '../../interfaces/uistate.interface'

interface MyWindow extends Window {
  myFunction(): void;
}

declare var window: MyWindow;


@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  documents: Observable<Document[]>
  documentId: string
  printUrl: string
  printerValid: boolean = false

  constructor(private store: Store<AppState>,
              private navbarService: NavbarService,
              private route: ActivatedRoute,
              private documentService: DocumentService,
              private userService: UserService,
              private router: Router) {

    this.store = store
    this.navbarService = navbarService


  }

  getUIState(store: Store<AppState>): UIState {

    let uistate: UIState;

    store.take(1).subscribe(s => uistate = s.uistate);

    return uistate;
  }

  invalidatePrinter() {

    this.printerValid = false
  }

  printActiveDocument() {

      this.store
        .take(1)
        .subscribe((state) => [
          this.documentService.printDocument(state.activeDocument.id, state.user.token,
            (payload) => [this.printUrl = payload, this.printerValid = true])
        ])

  }

  ngOnInit() {

    this.documentId = this.route.params['_value']['id']

    if (this.documentId != undefined) {

      this.documentService.getDocumentAndSubdocuments(parseInt(this.documentId))
    }

    this.navbarService.updateUIState('read')


  }

}
