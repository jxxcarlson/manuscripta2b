import { NgModule } from '@angular/core';

import {routing} from './routes'

import { Constants } from './toplevel/constants'

import { StoreModule } from '@ngrx/store';
import { documentsReducer } from './reducers/documents.reducer'
import { activeDocumentReducer } from './reducers/activeDocument.reducer'
import {DocumentService} from './services/document.service';

import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreLogMonitorModule, useLogMonitor} from '@ngrx/store-log-monitor';
import {provideStore} from '@ngrx/store';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './toplevel/app/app.component';
import { FooterComponent } from './toplevel/footer/footer.component';
import { DocumentComponent } from './reader/document/document.component';
import { ReaderComponent } from './reader/reader/reader.component';
import { EditorComponent } from './editor/editor/editor.component';
import { ImagesComponent } from './images/images/images.component';

import { HtmlPane } from './shared/htmlpane.component';
import { MathJaxPane } from './shared/mathjaxpane.component';
import { TextPane } from './shared/textpane.component';

import { QueryParser } from './services/queryparser.service';
import { MathJaxDirective } from './directives/mathjax.directive';

import { TextPageHeightDirective } from './directives/textpageheight.directive';
import { DocumentListComponent } from './reader/document-list/document-list.component';
import { DocumentListItemComponent } from './reader/document-list-item/document-list-item.component';
import { SearchComponent } from './reader/search/search.component';
import { AboutComponent } from './toplevel/about/about.component';

import { SearchScopeControlComponent } from './reader/search-scope-control2/search-scope-control.component';
import { SettingsComponent } from './toplevel/settings/settings.component';

import {AuthorizationModule} from "./auth/authorization.module";
import {NavbarModule} from "./toplevel/navbar/navbar.module"
import {HomeModule} from "./toplevel/home/home.module";


//{ path: 'hero/:id', component: HeroDetailComponent },
//{ path: '**', component: PageNotFoundComponent }



@NgModule({
  declarations: [
    AppComponent,

    FooterComponent,
    DocumentComponent,
    EditorComponent,
    ReaderComponent,
    HtmlPane, TextPane, MathJaxDirective, TextPageHeightDirective,
    DocumentListComponent, DocumentListItemComponent,
    MathJaxPane,
    SearchComponent,
    AboutComponent,
    ImagesComponent,
    SearchScopeControlComponent,
    SettingsComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AuthorizationModule,
    HomeModule,
    NavbarModule,
    StoreModule.provideStore({ documents: documentsReducer, activeDocument: activeDocumentReducer })
  ],
  providers: [
    QueryParser, Constants,
    DocumentService
  ],
  bootstrap: [AppComponent, [ ]]
})
export class AppModule { }

