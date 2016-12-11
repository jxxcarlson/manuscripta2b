import { NgModule } from '@angular/core';

import {AppRoutingModule} from '../../app-routing.module'


// Internal to navbar directory:
import { NavbarComponent } from './navbar.component'
import {NavbarService} from "./navbar.service";
import { CommonModule } from '@angular/common'
import {SearchModule} from '../../search/search.module'


@NgModule({

  declarations: [

    NavbarComponent

  ],

  imports: [

    AppRoutingModule,
    SearchModule,
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
