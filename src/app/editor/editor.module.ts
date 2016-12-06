import { NgModule } from '@angular/core';

import {AppRoutingModule} from '../app-routing.module'


import { CommonModule } from '@angular/common'
import {EditorComponent} from "./editor/editor.component";
import {DocumentService} from '../services/document.service'
import {DocumentComponent} from '../reader/document/document.component'


@NgModule({

  declarations: [

    EditorComponent

  ],

  imports: [

    AppRoutingModule,
    CommonModule // for async pipe

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
