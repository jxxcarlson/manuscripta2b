import { NgModule } from '@angular/core';

// Internal to signin directory:
import { SigninService } from './signin.service'
import { SigninComponent } from "./signin/signin.component";

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

