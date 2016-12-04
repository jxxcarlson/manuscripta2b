import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../navbar/navbar.service'


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private navbarService: NavbarService) {

    this.navbarService = navbarService

  }

  ngOnInit() {

    this.navbarService.updateUIState('about')
  }

}


