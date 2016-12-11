import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service'
import { AppState } from '../../state-management/interfaces/appstate.interface';
import { Store } from '@ngrx/store';
import { User } from '../../state-management/interfaces/user.interface'
import { Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user$: Observable<User>

  constructor(private navbarService: NavbarService,
              private userStore: Store<AppState>) {

    this.navbarService = navbarService
    this.userStore = userStore

  }

  ngOnInit() {

    this.navbarService.updateUIState('home')

    this.userStore
      .select('user')
      .subscribe((val: Observable<User>)=> [
        this.user$ = val,
        console.log(`userState changed: ${JSON.stringify(this.user$)}`)
      ])
  }

}
