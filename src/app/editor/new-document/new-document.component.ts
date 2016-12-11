

import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AppState } from '../../interfaces/appstate.interface';
import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store';


@Component({
  selector: 'new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {


  constructor(
              private store: Store<AppState>
  ) {

    this.store = store
  }


  ngOnInit() {


  }



}
