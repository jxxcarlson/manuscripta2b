import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {NavbarService} from '../../../toplevel/navbar/navbar.service'

import {Document} from '../../../interfaces/document.interface'

import { UPDATE_EDIT_TEXT, SET_EDIT_TEXT } from '../../../reducers/editor.reducer'
import { UPDATE_DOCUMENT } from '../../../reducers/activeDocument.reducer'

import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
interface AppState {
  documents: Document[],
  activeDocument: Document
}

import {Editor} from '../../../interfaces/editor.interface'


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {


  activeDocument$: Observable<Document>
  documents: Observable<Document[]>
  edit_text: string
  model = { source_text: ''}

  constructor(
              private navbarService: NavbarService,
              private store: Store<AppState>,
              private cd: ChangeDetectorRef) {

    console.log('CONSTRUCT EDITOR')
    this.navbarService = navbarService
    this.store = store

    store.select('activeDocument')
      .subscribe( (activeDocument: Observable<Document>) => this.activeDocument$ = activeDocument )

    store.select('editor')
      .subscribe( (edit_state: Observable<Editor>) => this.edit_state$ = edit_state )

  }


  updateText() {

    this.store.dispatch({type:SET_EDIT_TEXT, payload: this.model.source_text})

  }

  updateTextOfActiveDocument() {

    this.store.select('activeDocument')
      .take(1)
      .subscribe( (doc: Document) => [
        doc.text = this.model.source_text,
        console.log(`EDIT TEXT: ${doc.text}`)
        this.store.dispatch({type:UPDATE_DOCUMENT, payload: doc})
      ])
  }

  setText() {

    this.store.select('activeDocument')
      .take(1)
      .subscribe( (doc: Document) => [
        console.log(  `SET EDITOR TEXT TO ${doc.text}`),
        this.edit_text = doc.text,
        this.store.dispatch({type:SET_EDIT_TEXT, payload: doc.text})
      ])
  }

  report() {

    console.log(`REPORT: source_text = ${this.model.source_text}`)
    this.updateTextOfActiveDocument()

  }


  ngOnInit() {

    this.navbarService.updateUIState('edit')

    this.setText()

    this.store
      .select('activeDocument')
      .subscribe((val: Document)=> [
        // this.text$ = val.text,
        this.edit_text = val.text,
        this.model.source_text = val.text,
        console.log(`Text changed: ${val.text}`)
      ])
  }


}
