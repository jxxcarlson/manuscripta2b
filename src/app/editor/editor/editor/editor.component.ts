import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {NavbarService} from '../../../toplevel/navbar/navbar.service'

import {Document} from '../../../interfaces/document.interface'

import { UPDATE_EDIT_TEXT, SET_EDIT_TEXT } from '../../../reducers/editor.reducer'

import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
interface AppState {
  documents: Document[],
  activeDocument: Document
}


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {


  activeDocument$: Observable<Document>
  documents: Observable<Document[]>
  doc: Document

  constructor(
              private navbarService: NavbarService,
              private store: Store<AppState>,
              private cd: ChangeDetectorRef) {

    console.log('CONSTRUCT EDITOR')
    this.navbarService = navbarService
    this.store = store

    store.select('activeDocument')
      .take(1)
      .subscribe( (doc: Document) => [
        console.log(  `SET EDITOR TEXT TO ${doc.text}`),
        this.store.dispatch({type:SET_EDIT_TEXT, payload: doc.text})
      ])

  }


  ngOnInit() {

    this.navbarService.updateUIState('edit')

    this.store
      .select('activeDocument')
      .subscribe((val: Document)=> [
        // this.text$ = val.text,
        this.edit_text$ = val.text,
        console.log(`Text changed: ${val.text}`)
      ])
  }


}
