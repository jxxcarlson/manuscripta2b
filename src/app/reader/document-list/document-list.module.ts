import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentListComponent } from './document-list.component'
import { DocumentListItemComponent } from '../document-list-item/document-list-item.component';
import { TextHelpersModule } from '../../text_helpers/text_helpers.module'


@NgModule ({


  declarations: [

    DocumentListComponent,
    DocumentListItemComponent

  ],


  imports: [

    BrowserModule,
    TextHelpersModule

  ],

  providers: [],

  exports: [

    DocumentListComponent
  ]


})
export class DocumentListModule {}
