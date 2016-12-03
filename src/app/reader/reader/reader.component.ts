import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store'
import { SET_DOCUMENTS } from '../../reducers/documents.reducer'
interface AppState {
  documents: Document[]
  activeDocument: Document
}


@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  documents: Observable<Document[]>

  constructor(private store: Store<AppState>) {

    this.store = store

  }

  ngOnInit() {

  }

}
