import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild  } from '@angular/core';
import {NavbarService} from '../../../toplevel/navbar/navbar.service'
import {EditorToolsComponent} from '../../editor-tools/editor-tools.component'

import {Document} from '../../../interfaces/document.interface'

import { UPDATE_EDIT_TEXT, SET_EDIT_TEXT } from '../../../reducers/editor.reducer'
import { UPDATE_DOCUMENT } from '../../../reducers/activeDocument.reducer'

import { Observable, Subscription } from 'rxjs/Rx';
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
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild(EditorToolsComponent)
  private editorToolsComponent: EditorToolsComponent;

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
        // console.log(`EDIT TEXT: ${doc.text}`)
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

  manualUpdate() {

    this.updateTextOfActiveDocument()
    this.editorToolsComponent.updateDocument()


  }

  ticks=0
  private timer;
  // Subscription object
  private sub: Subscription;

  tickerFunc(tick){
    console.log(tick);
    this.updateTextOfActiveDocument()
    this.ticks = tick + 1
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
        // console.log(`Text changed: ${val.text}`)
      ])

    this.timer = Observable.timer(2000,5000);
    // subscribing to a observable returns a subscription object
    this.sub = this.timer.subscribe(t => this.tickerFunc(t));
  }

  ngOnDestroy(){
    console.log("Destroy timer");
    // unsubscribe here
    this.sub.unsubscribe();

  }


}
