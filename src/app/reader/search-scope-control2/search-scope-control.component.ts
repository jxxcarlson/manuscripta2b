import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-scope-control',
  templateUrl: './search-scope-control.component.html',
  styleUrls: ['./search-scope-control.component.css']
})
export class SearchScopeControlComponent  {

  selectedOption:Options = new Options(1, 'My docs');

  options = [
    new Options(1, 'My docs' ),
    new Options(2, 'Other' ),
    new Options(23, 'All' ),
  ];

  getValue(optionid) {
    this.selectedOption = this.options.filter((item)=> item.id == optionid)[0];
  }

}

export class Options {
  constructor(public id: number, public name: string) { }
}


// https://plnkr.co/edit/peK6zJngB9X76nOzDzYo?p=preview
