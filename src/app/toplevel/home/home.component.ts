import { Component, OnInit } from '@angular/core';
import { SigninComponent } from '../../auth/signin/signin.component'
import {NavbarService} from '../navbar/navbar.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private navbarService: NavbarService) {

    this.navbarService = navbarService

  }

  ngOnInit() {

    this.navbarService.updateUIState('home')
  }

}
