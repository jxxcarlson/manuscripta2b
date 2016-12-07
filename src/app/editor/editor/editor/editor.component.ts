import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../../toplevel/navbar/navbar.service'


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

  constructor(
              private navbarService: NavbarService,
              private store: Store<AppState>) {

    console.log('CONSTRUCT EDITOR')
    this.navbarService = navbarService
    this.store = store


    store.select('activeDocument')
      .subscribe( (activeDocument: Observable<Document>) => this.activeDocument$ = activeDocument )

  }


  ngOnInit() {

    this.navbarService.updateUIState('edit')
  }

}
