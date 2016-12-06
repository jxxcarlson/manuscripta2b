import { NgModule } from '@angular/core';
import { DocumentComponent } from './document.component'

import { TextHelpersModule } from '../../directives/text_helpers.module'


@NgModule ({


  declarations: [

    DocumentComponent

  ],

  imports: [

    TextHelpersModule
  ],

  providers: [],

  exports: [

    DocumentComponent
  ]


})
export class DocumentDisplayModule {}

/**

 import { NgModule } from '@angular/core';

 @NgModule ({


  declarations: [],

  imports: [],

  providers: [],

  exports: []


})
 export class DocumentDisplayModule {}

 **/
