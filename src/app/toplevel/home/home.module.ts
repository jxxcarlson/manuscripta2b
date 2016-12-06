import {AppRoutingModule} from '../../app-routing.module'
import { NgModule } from '@angular/core';

import {HomeComponent} from "./home.component";
import {AuthorizationModule} from "../../auth/authorization.module";


@NgModule({

  declarations: [

    HomeComponent
  ],

  imports: [

      AppRoutingModule,
      AuthorizationModule
    ],

  providers: [


  ],

  exports: [ ]

})
export class HomeModule { }

