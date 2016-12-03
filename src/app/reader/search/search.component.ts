import { Component, OnInit } from '@angular/core';

import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
interface AppState {
  documents: Document[],
  activeDocument: Document
}

@Component({
  selector: 'searchbar',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private store: Store<AppState>) {

    this.store = store.select(s => s.activeDocument)

  }

  searchResults = []

  doSearch(searchTerm: HTMLInputElement) {

    //this.apiService.search(searchTerm.value, this.searchResults)
    console.log(`Search results: ${this.searchResults.length}`)
    // this.documentService.announceDocumentList(this.searchResults)
    this.searchResults = []

  }



  ngOnInit() {

  }

}
