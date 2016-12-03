import { Component, OnInit} from '@angular/core';
import { Observable} from 'rxjs/Rx';

import { Document } from '../../interfaces/document.interface'


// import { AppState } from '../../models/appstate.model'
import { Store } from '@ngrx/store'
import { DocumentService } from '../../services/document.service'
import {SigninService} from "../../auth/signin.service";

interface AppState {
  documents: Document[]
}

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  documents: Observable<Document[]>
  initialDocuments = [
    {
     id: 1,
     title: 'Introductory Magick',
     text: 'Beware of witches and enchanted animals!',
     rendered_text: 'Beware of witches and enchanted animals!'
     }
  ]


  constructor(private store: Store<AppState>,
              private signinService: SigninService,
              private documentService: DocumentService) {

    this.documents = store.select(s => s.documents)
    this.signinService = signinService
  }

  ngOnInit() {
  }


  doIt() {

    this.documentService.loadDocument(265)
    console.log('OK Boss, I got the document')
  }


}
