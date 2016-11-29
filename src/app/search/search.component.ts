import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service'

@Component({
  selector: 'searchbar',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private apiService: ApiService) {

    this.apiService = apiService

  }

  searchResults = []

  doSearch(searchTerm: HTMLInputElement) {

    this.apiService.search(searchTerm.value, this.searchResults)

  }
  ngOnInit() {

  }

}
