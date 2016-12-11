import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
import {DocumentService} from '../../services/document.service'
import {MailService} from '../../services/mailService'
import {Constants} from '../../toplevel/constants'


import {NavbarService} from '../../toplevel/navbar/navbar.service'

import {ActivatedRoute, Router} from "@angular/router";
import {AppState} from '../../state-management/interfaces/appstate.interface'
import {Document} from '../../state-management/interfaces/document.interface'

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
  activeDocument: Document
  documentId: string

  printUrl: string
  printerValid: boolean = false

  exportUrl: string
  exportValid: boolean = false

  host: string = 'http://localhost:4200'

  constructor(private store: Store<AppState>,
              private navbarService: NavbarService,
              private route: ActivatedRoute,
              private documentService: DocumentService,
              private mailService: MailService,
              private router: Router) {

    this.store = store
    this.navbarService = navbarService

    store.select(s => s.activeDocument)
      .subscribe( activeDocument => this.activeDocument = activeDocument)

  }


  invalidatePrinter() { this.printerValid = false }
  invalidateExport() { this.exportValid = false }

  shareActiveDocument() {

    this.store
      .take(1)
      .subscribe((state) =>
        this.mailService.shareDocument(state.activeDocument))

  }

  printActiveDocument() {

      this.store
        .take(1)
        .subscribe((state) => [
          this.documentService.printDocument(state.activeDocument.id, state.user.token,
            (payload) => [this.printUrl = payload, this.printerValid = true])
        ])

  }

  exportDocumetToLaTeX() {

    this.store
      .take(1)
      .subscribe((state) => [
        this.documentService.exportDocumentToLaTex(state.activeDocument.id, state.user.token,
          (payload) => [this.exportUrl = payload, this.exportValid = true])
      ])
  }

  getDocumentFromRoute() {

    this.documentId = this.route.params['_value']['id']

    if (this.documentId != undefined) {

      this.documentService.getDocumentAndSubdocuments(parseInt(this.documentId))
    }
  }

  ngOnInit() {

    this.getDocumentFromRoute()

    this.navbarService.updateUIState('read')


  }

}


/**


 getUIState(store: Store<AppState>): UIState {

    let uistate: UIState;

    store.take(1).subscribe(s => uistate = s.uistate);

    return uistate;
  }

 **/
