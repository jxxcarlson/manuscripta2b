import { Component, OnInit } from '@angular/core';
import { User } from '../user.model'

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor() { }

  model = new User(18, 'j.foobar', 'f.foobar@foo.io', 'wazawaza1234');
  submitted = false;
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }

}
}
