import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../toplevel/navbar/navbar.service'

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor(private navbarService: NavbarService) {

    this.navbarService = navbarService

  }

  ngOnInit() {

    this.navbarService.updateUIState('media')

  }

}
