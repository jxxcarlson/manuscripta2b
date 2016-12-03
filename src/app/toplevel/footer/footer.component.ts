import { Component, OnInit } from '@angular/core';
import { Document } from '../../shared/document.model'

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  activeDocument: Document
  id: string = '222'
  has_subdocuments: boolean = false



  constructor() {


  }

  ngOnInit() {
  }

}
