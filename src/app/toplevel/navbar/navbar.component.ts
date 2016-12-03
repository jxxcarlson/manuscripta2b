import { Component, OnInit} from '@angular/core';
import { Observable} from 'rxjs/Rx';

import { Document } from '../../models/document.model'

import { SigninService } from '../../services/signin.service'

// import { AppState } from '../../models/appstate.model'
import { Store } from '@ngrx/store'
import { DocumentService } from '../../services/document.service'

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


  constructor(private signinService: SigninService,
              private store: Store<AppState>,
              private documentService: DocumentService) {

    this.signinService = signinService
    this.documents = store.select(s => s.documents)
  }

  ngOnInit() {
  }

  doIt() {

    this.documentService.getDocument(265)
    console.log('OK Boss, I got the document')
  }
  doIt2() {

    this.signinService.test()
    console.log("I did it, boss")
  }

}
