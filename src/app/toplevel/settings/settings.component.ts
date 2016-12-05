import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../navbar/navbar.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private navbarService: NavbarService) {

    this.navbarService = navbarService

  }

  ngOnInit() {

    this.navbarService.updateUIState('settings')
  }

}
