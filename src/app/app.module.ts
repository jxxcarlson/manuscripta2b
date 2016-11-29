import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DocumentComponent } from './document/document.component';

import { HtmlPane } from './shared/htmlpane.component';
import { MathJaxPane } from './shared/mathjaxpane.component';
import { TextPane } from './shared/textpane.component';

import { ApiService } from './shared/api.service';
import { DocumentNotificationService } from './shared/document-notification.service';
import { DocumentService } from './shared/document.service';
import { QueryParser } from './shared/queryparser.service';
import { MathJaxDirective } from './shared/mathjax.directive';

import { TextPageHeightDirective } from './shared/textpageheight.directive';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentListItemComponent } from './document-list-item/document-list-item.component';
import { SearchComponent } from './search/search.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DocumentComponent,
    HtmlPane, TextPane, MathJaxDirective, TextPageHeightDirective,
    DocumentListComponent, DocumentListItemComponent,
    MathJaxPane,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DocumentNotificationService,
    DocumentService,
    QueryParser, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
