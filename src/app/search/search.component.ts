import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service'
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/take'

import {AppState} from '../state-management/interfaces/appstate.interface'

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

    this.documentService.search(searchTerm.value)

  }

  ngOnInit() {

  }

}
