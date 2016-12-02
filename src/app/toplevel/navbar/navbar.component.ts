import { Component, OnInit } from '@angular/core';
import { SigninService } from '../../services/signin.service'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private signinService: SigninService) {

    this.signinService = signinService
  }

  ngOnInit() {
  }

  doIt() {

    this.signinService.test()
    console.log("I did it, boss.")
  }

}
