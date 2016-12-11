import {Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit} from '@angular/core';
import {NavbarService} from '../../../toplevel/navbar/navbar.service'
import {EditorToolsComponent} from '../../editor-tools/editor-tools.component'
import {DocumentService} from '../../../services/document.service'
import {Document} from '../../../state-management/interfaces/document.interface'
import { Observable, Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store'
import {Constants} from '../../../toplevel/constants'

interface AppState {
  documents: Document[],
  activeDocument: Document
}

import {Editor} from '../../../state-management/interfaces/editor.interface'


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
  wordCount: number

  // Timer for auto-update of document text
  number_of_keypresses: number = 0
  tickCycleCount =0
  private timer;
  private sub: Subscription;

  constructor(
              private constants: Constants,
              private navbarService: NavbarService,
              private store: Store<AppState>,
              private documentService: DocumentService,
              private cd: ChangeDetectorRef) {

    console.log('CONSTRUCT EDITOR')
    this.navbarService = navbarService
    this.store = store

    this.activeDocument$ = store.select(state => state.activeDocument)
    //store.select('activeDocument')
    //  .subscribe( (activeDocument: Observable<Document>) => this.activeDocument$ = activeDocument )

  }


  updateAndRenderText() {

    this.documentService.updateTextOfActiveDocument(this.model.source_text)
    this.wordCount = this.model.source_text.split(' ').length
    this.editorToolsComponent.updateDocument()

  }

  handleKeyPress(arg) {

    this.number_of_keypresses  = this.number_of_keypresses + 1
  }


  tickerFunc(tick){

    if (tick == 1) {  this.wordCount = this.model.source_text.split(' ').length }
    this.wordCount = this.model.source_text.split(' ').length

    if (this.number_of_keypresses > 0 ) {

      this.documentService.updateTextOfActiveDocument(this.model.source_text)

      if (this.tickCycleCount > this.constants.tickCycleSize) {

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
    this.documentService.setTextFromActiveDocument()

    this.store.select(state => this.model.source_text = state.activeDocument.text)

    this.store
      .select('activeDocument')
      .subscribe((val: Document)=> [
        this.model.source_text = val.text,
      ])


    this.timer = Observable.timer(2000,1000);
    this.sub = this.timer.subscribe(t => this.tickerFunc(t));
  }

  ngOnDestroy(){

    console.log("Destroy timer");
    this.sub.unsubscribe();

  }


}
