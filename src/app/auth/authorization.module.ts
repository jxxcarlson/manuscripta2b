import { NgModule } from '@angular/core';

import { SigninService } from './signin.service'
import {SigninComponent} from "./signin/signin.component";

@NgModule({

  declarations: [

    SigninComponent
  ],

  imports: [ ],

  providers: [

    SigninService

  ],

  exports: [

    SigninComponent
  ]

})
export class AuthorizationModule { }

