import {Component, OnInit, state} from '@angular/core';
import { User } from '../../state-management/interfaces/user.interface'
import { AppState } from '../../state-management/interfaces/appstate.interface'


import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/take'

import { Document } from '../../state-management/interfaces/document.interface'


import {DocumentService} from '../../services/document.service'
// import {async} from "rxjs/scheduler/async";


@Component({
  selector: 'editor-tools',
  templateUrl: './editor-tools.component.html',
  styleUrls: ['./editor-tools.component.css']
})
export class EditorToolsComponent implements OnInit {

  // user: User

  activeDocument$: Observable<Document>
  publicColor$: Observable<string>
  publicTitle$: Observable<string>

  constructor(
    private documentService: DocumentService,
    private store: Store<AppState>,
    private userStore: Store<User>
  ) {

    this.store = store
    this.userStore = userStore

  }

  togglePublic() {

    this.store
      .take(1)
      .subscribe((state) => [
        this.documentService.togglePublic(state.activeDocument)
      ])
  }


  updateDocument() {

    this.store
      .take(1)
      .subscribe((state) => [
        console.log(`QQQ: UPDATE, token = ${JSON.stringify(state.user.token)}`),
        this.documentService.updateDocument(state.activeDocument)
      ])
  }

  moveSubdocument(direction: string) {


    this.store
      .take(1)
      .subscribe((state) => [
        console.log(`QQQ: UPDATE, token = ${JSON.stringify(state.user.token)}`),
        this.documentService.moveSubdocument(state.activeDocument, direction)
      ])
  }


  ngOnInit() {

    this.activeDocument$ = this.store.select(state => state.activeDocument)
    this.publicColor$ = this.store.select(state => state.activeDocument.public ? 'cornflowerblue' : 'darkred')
    this.publicTitle$ = this.store.select(state => state.activeDocument.public ? 'Public' : 'Private')


  }

}


// https://scotch.io/tutorials/angular-2-http-requests-with-observables
// myservice.getDocument().mergeMap(doc => myhttp.postDoc(doc))

// https://github.com/ngrx/store/issues/175
// https://github.com/ngrx/store/issues/147
