import { NgModule } from '@angular/core';

import {routing} from '../../routes'


// Internal to navbar directory:
import { NavbarComponent } from './navbar.component'
import {NavbarService} from "./navbar.service";


@NgModule({

  declarations: [

    NavbarComponent

  ],

  imports: [

    routing

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
