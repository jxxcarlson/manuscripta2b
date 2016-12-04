import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../toplevel/navbar/navbar.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(private navbarService: NavbarService) {

    this.navbarService = navbarService

  }

  ngOnInit() {

    this.navbarService.updateUIState('edit')
  }

}
