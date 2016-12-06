
import { NgModule } from '@angular/core';


import { TextPageHeightDirective } from './textpageheight.directive'
import { MathJaxDirective } from './mathjax.directive'
import { MathJaxPane } from './mathjaxpane.component'
import { HtmlPane } from './htmlpane.component'
import { TextPane } from './textpane.component'

@NgModule ({


  declarations: [

    TextPageHeightDirective,
    MathJaxDirective,
    MathJaxPane,
    HtmlPane,
    TextPane
  ],

  imports: [



  ],

  providers: [],

  exports: [

    TextPageHeightDirective,
    MathJaxDirective,
    MathJaxPane,
    HtmlPane,
    TextPane

  ]


})
export class TextHelpersModule {}

/**
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
