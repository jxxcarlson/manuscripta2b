import { NgModule } from '@angular/core';

import {routing} from '../../routes'


// Internal to navbar directory:
import { NavbarComponent } from './navbar.component'
import {NavbarService} from "./navbar.service";
import { CommonModule } from '@angular/common'


@NgModule({

  declarations: [

    NavbarComponent

  ],

  imports: [

    routing,
    CommonModule // for async pipe

  ],

  providers: [

    NavbarService

  ],

  exports: [

    NavbarComponent
  ]

})
export class NavbarModule { }

// http://juristr.com/blog/2016/09/ng2-serialize-with-json-pipe/
