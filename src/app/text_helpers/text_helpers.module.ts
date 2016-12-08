
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';

import { TextPageHeightDirective } from './textpageheight.directive'
import { MathJaxDirective } from './mathjax.directive'
import { MathJaxPane } from './mathjaxpane.component'
import { HtmlPane } from './htmlpane.component'
import { TextPane } from './textpane.component'
import { TextAreaPane } from './textareapane.component'
import { TextInput } from './text_input.component'

@NgModule ({


  declarations: [

    TextPageHeightDirective,
    MathJaxDirective,
    MathJaxPane,
    HtmlPane,
    TextPane,
    TextAreaPane,
    TextInput
  ],

  imports: [

    FormsModule

  ],

  providers: [],

  exports: [

    TextPageHeightDirective,
    MathJaxDirective,
    MathJaxPane,
    HtmlPane,
    TextPane,
    TextAreaPane,
    TextInput

  ]


})
export class TextHelpersModule {}

