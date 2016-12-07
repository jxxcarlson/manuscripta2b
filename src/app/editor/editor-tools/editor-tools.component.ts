import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface'


import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
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
  updateDocument() {

    console.log(`1. Updating document ${this.activeDocument$.id}`)
    this.documentService.updateDocument(this.activeDocument$, this.user$.token)
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
