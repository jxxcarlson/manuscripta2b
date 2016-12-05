import { Component, OnInit } from '@angular/core';
import { SigninComponent } from '../../auth/signin/signin.component'
import {NavbarService} from '../navbar/navbar.service'
import { AppState } from '../../interfaces/appstate.interface';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/user.interface'
import { Observable} from 'rxjs/Rx';
import {Pipe} from 'angular2/core';
import {SigninService} from "../../auth/signin.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username$: Observable<string>
  user$: Observable<User>

  constructor(private navbarService: NavbarService,
              private userStore: Store<AppState>,
              private signinService: SigninService) {

    this.navbarService = navbarService
    this.userStore = userStore
    this.signinService = signinService

  }

  signOut() {

    this.signinService.signout()
  }

  ngOnInit() {

    this.navbarService.updateUIState('home')

    this.userStore
      .select('user')
      .subscribe((val: Observable<User>)=> [
        this.user$ = val,
        this.username$ = val['username'],
        console.log(`userState changed: ${JSON.stringify(this.user$)}`)
      ])
  }

}
