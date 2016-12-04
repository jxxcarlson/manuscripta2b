import { Component, OnInit} from '@angular/core';
import { Observable} from 'rxjs/Rx';

import { AppState } from '../../interfaces/appstate.interface';
import { Store } from '@ngrx/store';
import { UIState } from '../../interfaces/uistate.interface';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  uistate: UIState


  constructor(private store: Store<AppState>) {

    // store.select(s => s.uistate).subscribe(uistate => this.navState = uistate.activeNavSection)
    // store.select(s => s.uistate).subscribe(uistate => console.log(`ANS: ${uistate.activeNavSection}`)
    // store.select(s => s.uistate).subscribe(uistate => console.log(`ANS`))

    //this.reporter = store.select(s => s.uistate)
    store.select(s => s.uistate).subscribe(uistate => this.uistate = uistate)

  }

  ngOnInit() {  }


  doIt() {

    console.log('OK Boss, I got the document')
  }


}
