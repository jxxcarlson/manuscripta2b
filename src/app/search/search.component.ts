import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service'
import {DocumentNotificationService} from "../shared/document-notification.service";

@Component({
  selector: 'searchbar',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private apiService: ApiService, private documentService: DocumentNotificationService) {

    this.apiService = apiService

    this.documentService = documentService

  }

  searchResults = []

  doSearch(searchTerm: HTMLInputElement) {


    this.apiService.search(searchTerm.value, this.searchResults)
    console.log(`Search results: ${this.searchResults.length}`)
    this.documentService.announceDocumentList(this.searchResults)
    this.searchResults = []

  }



  ngOnInit() {

  }

}
