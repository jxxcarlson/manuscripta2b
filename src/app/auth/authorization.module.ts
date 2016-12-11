import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Internal to signin directory:
import { SigninService } from './authorization.service'
import { SigninComponent } from "./signin/signin.component";

@NgModule({

  declarations: [

    SigninComponent
  ],

  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],

  providers: [

    SigninService

  ],

  exports: [

    SigninComponent
  ]

})
export class AuthorizationModule { }

// http://juristr.com/blog/2016/09/ng2-serialize-with-json-pipe/
