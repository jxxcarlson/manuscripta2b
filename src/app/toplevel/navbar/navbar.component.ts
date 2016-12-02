import { Component, OnInit} from '@angular/core';
import { Observable} from 'rxjs/Rx';

import { Document } from '../../models/document.model'

import { SigninService } from '../../services/signin.service'

// import { AppState } from '../../models/appstate.model'
import { Store } from '@ngrx/store'
import { INITIALIZE_DOCUMENTS } from '../../reducers/documents.reducer'

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
              private store: Store<AppState>) {

    this.signinService = signinService
    this.documents = store.select(s => s.documents)
  }

  loadInitialDocuments() {

    this.store.dispatch({ type: INITIALIZE_DOCUMENTS, payload: this.initialDocuments }  )
  }

  ngOnInit() {
  }

  doIt() {

    this.loadInitialDocuments
    console.log("I did it, boss, the documents are there.")
  }

  doIt1() {

    this.signinService.test()
    console.log("I did it, boss")
  }

}
