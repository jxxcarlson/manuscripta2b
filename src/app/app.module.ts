import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module'

import { Constants } from './toplevel/constants'

import { StoreModule } from '@ngrx/store';
import { documentsReducer } from './reducers/documents.reducer'
import { activeDocumentReducer } from './reducers/activeDocument.reducer'
import { uistateReducer } from './reducers/uistate.reducer'
import { userReducer } from './reducers/user.reducer'


import {DocumentService} from './services/document.service';

import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreLogMonitorModule, useLogMonitor} from '@ngrx/store-log-monitor';
import {provideStore} from '@ngrx/store';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './toplevel/app/app.component';
import { FooterComponent } from './toplevel/footer/footer.component';
import { ReaderComponent } from './reader/reader/reader.component';
import { ImagesComponent } from './images/images/images.component';

import { QueryParser } from './services/queryparser.service';

import { SearchComponent } from './search/search.component';
import { AboutComponent } from './toplevel/about/about.component';

import { SearchScopeControlComponent } from './reader/search-scope-control2/search-scope-control.component';
import { SettingsComponent } from './toplevel/settings/settings.component';

import {AuthorizationModule} from "./auth/authorization.module";
import {NavbarModule} from "./toplevel/navbar/navbar.module"
import {HomeModule} from "./toplevel/home/home.module";
import {EditorModule} from "./editor/editor.module";
import {DocumentDisplayModule} from './reader/document/document_display.module'
import {DocumentListModule} from './reader/document-list/document-list.module'




@NgModule({
  declarations: [
    AppComponent,

    FooterComponent,
    ReaderComponent,
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
    AppRoutingModule,
    AuthorizationModule,
    HomeModule,
    DocumentDisplayModule,
    DocumentListModule,
    NavbarModule,
    EditorModule,
    StoreModule.provideStore({
      documents: documentsReducer,
      activeDocument: activeDocumentReducer,
      user: userReducer,
      uistate: uistateReducer
    })
  ],
  providers: [
    QueryParser, Constants,
    DocumentService
  ],
  bootstrap: [AppComponent, [ ]]
})
export class AppModule { }

