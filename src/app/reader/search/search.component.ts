import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service'

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

  constructor(private documentService: DocumentService) {

    this.documentService = documentService

  }

  doSearch(searchTerm: HTMLInputElement) {

    this.documentService.search(searchTerm.value)

  }

  ngOnInit() {

  }

}
