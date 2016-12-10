import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentDisplayModule } from '../document/document_display.module'
import { DocumentListModule } from '../document-list/document-list.module'



@NgModule ({

  declarations: [

  ],

  imports: [

    BrowserModule,
    DocumentDisplayModule,
    DocumentListModule,

  ],

  providers: [

  ],

  exports: [

  ]


})
export class ReaderModule {}
