import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../toplevel/navbar/navbar.service'

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


  activeDocument: Document
  documents: Observable<Document[]>

  constructor(private navbarService: NavbarService,
              private store: Store<AppState>) {

    this.navbarService = navbarService
    this.store = store

    store.select(s => s.activeDocument)
      .subscribe( activeDocument => this.activeDocument = activeDocument )

  }

  ngOnInit() {

    this.navbarService.updateUIState('edit')
  }

}
