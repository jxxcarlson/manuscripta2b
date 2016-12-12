

import { Component, OnInit } from '@angular/core';
import { AppState } from '../../state-management/interfaces/appstate.interface';
import {DocumentService} from '../../services/document.service'
import { Store } from '@ngrx/store';
import {Router} from '@angular/router';

@Component({
  selector: 'new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {


  model = {title: ''}

  constructor(
              private store: Store<AppState>,
              private documentService: DocumentService,
              private router: Router

  ) {

    this.store = store
    this.documentService = documentService

  }
  gotoRoute() {

    setTimeout(() => {
      [this.router.navigateByUrl('/edit'),
        console.log('GO TO ROUTE')]
    }, 700)
  }


  submit() {

    let params = {
      title: this.model.title,
      options: '{}',
      current_document_id: 0,
      parent_document_id: 0
    }

    this.documentService.createDocument(params)

    this.gotoRoute()

  }


  ngOnInit() {

  }


}
