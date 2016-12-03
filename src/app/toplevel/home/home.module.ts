import { NgModule } from '@angular/core';

import {HomeComponent} from "./home.component";
import {AuthorizationModule} from "../../auth/authorization.module";
import {SigninComponent} from "../../auth/signin/signin.component";


@NgModule({

  declarations: [

    HomeComponent
  ],

  imports: [

      AuthorizationModule
    ],

  providers: [


  ],

  exports: [ ]

})
export class HomeModule { }

