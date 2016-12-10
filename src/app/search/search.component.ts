import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service'
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/take'

import {AppState} from '../interfaces/appstate.interface'

@Component({
  selector: 'searchbar',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private documentService: DocumentService,
              private store: Store<AppState>) {

    this.store = store
    this.documentService = documentService

  }

  doSearch(searchTerm: HTMLInputElement) {

    this.store
      .take(1)
      .subscribe((state) => [
        console.log(`TOKEN = ${state.user.token}`),
        this.documentService.search(searchTerm.value, state.user.token)
      ])


  }

  ngOnInit() {

  }

}
