import { NgModule } from '@angular/core';

import {AppRoutingModule} from '../app-routing.module'


import {CommonModule} from '@angular/common'
import {EditorComponent} from "./editor/editor.component";
import {DocumentService} from '../services/document.service'

import {DocumentDisplayModule} from '../reader/document/document_display.module'
import {DocumentListModule} from '../reader/document-list/document-list.module'
import {TextHelpersModule} from '../directives/text_helpers.module'


@NgModule({

  declarations: [

    EditorComponent

  ],

  imports: [

    AppRoutingModule,
    CommonModule, // for async pipe
    DocumentDisplayModule,
    DocumentListModule,
    TextHelpersModule

  ],

  providers: [

    DocumentService

  ],

  exports: [

    EditorComponent
  ]

})
export class EditorModule { }

// http://juristr.com/blog/2016/09/ng2-serialize-with-json-pipe/
