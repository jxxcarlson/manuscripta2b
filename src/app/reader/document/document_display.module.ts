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

 metadata_resolver.js:489Uncaught Error:
 Type TextPageHeightDirective is part of
 the declarations of 2 modules:
 DocumentDisplayModule and DocumentListModule!
 Please consider moving TextPageHeightDirective
 to a higher module that imports DocumentDisplayModule
 and DocumentListModule. You can also create a new
 NgModule that exports and includes TextPageHeightDirective
 then import that NgModule in DocumentDisplayModule and DocumentListModule.(…)

 **/
