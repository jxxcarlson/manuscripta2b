import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild  } from '@angular/core';
import {NavbarService} from '../../../toplevel/navbar/navbar.service'
import {EditorToolsComponent} from '../../editor-tools/editor-tools.component'
import {DocumentService} from '../../../services/document.service'

import {Document} from '../../../interfaces/document.interface'

import { SET_EDIT_TEXT } from '../../../reducers/editor.reducer'

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

  model = { source_text: ''}

  // Timer for auto-update of document text
  number_of_keypresses: number = 0
  tickCycleSize = 10
  tickCycleCount =0
  private timer;
  private sub: Subscription;

  constructor(
              private navbarService: NavbarService,
              private store: Store<AppState>,
              private documentService: DocumentService,
              private cd: ChangeDetectorRef) {

    console.log('CONSTRUCT EDITOR')
    this.navbarService = navbarService
    this.store = store

    store.select('activeDocument')
      .subscribe( (activeDocument: Observable<Document>) => this.activeDocument$ = activeDocument )

    store.select('editor')
      .subscribe( (edit_state: Observable<Editor>) => this.edit_state$ = edit_state )

  }


  setText() {

    this.store.select('activeDocument')
      .take(1)
      .subscribe( (doc: Document) => [
        this.store.dispatch({type:SET_EDIT_TEXT, payload: doc.text})
      ])
  }

  updateAndRenderText() {

    this.documentService.updateTextOfActiveDocument(this.model.source_text)
    this.editorToolsComponent.updateDocument()

  }

  handleKeyPress(arg) {

    this.number_of_keypresses  = this.number_of_keypresses + 1
  }



  tickerFunc(tick){

    // console.log(`tick: ${this.tickCycleCount}`);

    if (this.number_of_keypresses > 0 ) {

      console.log(`update text: ${this.tickCycleCount}`)
      this.documentService.updateTextOfActiveDocument(this.model.source_text)

      if (this.tickCycleCount > this.tickCycleSize) {

        console.log(`render text: ${this.tickCycleCount}`)
        this.editorToolsComponent.updateDocument()
        this.number_of_keypresses = 0

        this.tickCycleCount = 0
      }

    }

    this.tickCycleCount = this.tickCycleCount + 1
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

    this.timer = Observable.timer(2000,1000);
    // subscribing to a observable returns a subscription object
    this.sub = this.timer.subscribe(t => this.tickerFunc(t));
  }

  ngOnDestroy(){

    console.log("Destroy timer");
    this.sub.unsubscribe();

  }


}
