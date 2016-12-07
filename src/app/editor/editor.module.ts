import { NgModule } from '@angular/core';

import {AppRoutingModule} from '../app-routing.module'


import {CommonModule} from '@angular/common'
import {EditorComponent} from "./editor/editor/editor.component";
import {DocumentService} from '../services/document.service'

import {DocumentDisplayModule} from '../reader/document/document_display.module'
import {DocumentListModule} from '../reader/document-list/document-list.module'
import {TextHelpersModule} from '../text_helpers/text_helpers.module'
import {SearchModule} from '../search/search.module'
import {EditorToolsComponent} from './editor-tools/editor-tools.component'



@NgModule({

  declarations: [

    EditorComponent,
    EditorToolsComponent

  ],

  imports: [

    AppRoutingModule,
    CommonModule, // for async pipe
    DocumentDisplayModule,
    DocumentListModule,
    TextHelpersModule,
    SearchModule

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
