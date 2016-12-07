import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface'


import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/take'

import { Document } from '../../interfaces/document.interface'

interface AppState {
  documents: Document[],
  activeDocument: Document
}


import {DocumentService} from '../../services/document.service'
import {async} from "rxjs/scheduler/async";


@Component({
  selector: 'editor-tools',
  templateUrl: './editor-tools.component.html',
  styleUrls: ['./editor-tools.component.css']
})
export class EditorToolsComponent implements OnInit {

  activeDocument$: Observable<Document>
  doc: Document
  user$: Observable<User>

  constructor(
    private documentService: DocumentService,
    private store: Store<AppState>,
    private userStore: Store<AppState>
  ) {

    this.store = store
    this.userStore = userStore


    store.select('activeDocument')
      .subscribe( (activeDocument: Observable<Document>) => this.activeDocument$ = activeDocument )
  }

  // https://scotch.io/tutorials/angular-2-http-requests-with-observables
  // myservice.getDocument().mergeMap(doc => myhttp.postDoc(doc))

  // https://github.com/ngrx/store/issues/175
  // https://github.com/ngrx/store/issues/147

  updateDocument() {

    this.store.select('activeDocument')
      .take(1)
      .subscribe((activeDocument: Document) => [
        this.doc = activeDocument,
        this.documentService.updateDocument(this.doc, this.user$.token)
      ])
  }

  ngOnInit() {

    this.userStore
      .select('user')
      .subscribe((val: Observable<User>)=> [
        this.user$ = val,
        console.log(`ET: userState changed: ${JSON.stringify(this.user$)}`)
      ])

  }

}
