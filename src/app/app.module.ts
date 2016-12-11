import { NgModule } from '@angular/core';
import {enableProdMode} from '@angular/core';


import {AppRoutingModule} from './app-routing.module'

import { Constants } from './toplevel/constants'

import { StoreModule } from '@ngrx/store';
import { documentsReducer } from './state-management/reducers/documents.reducer'
import { activeDocumentReducer } from './state-management/reducers/activeDocument.reducer'
import { uistateReducer } from './state-management/reducers/uistate.reducer'
import { userReducer } from './state-management/reducers/user.reducer'

import {DocumentService} from './services/document.service';
import {UserService} from './services/user.service';
import {MailService} from './services/mailService'
import {WindowRef} from './services/windowRef'

import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreLogMonitorModule, useLogMonitor} from '@ngrx/store-log-monitor';
import {provideStore} from '@ngrx/store';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';


import { QueryParser } from './services/queryparser.service';

import { AppComponent } from './toplevel/app/app.component';
import { FooterComponent } from './toplevel/footer/footer.component';
import { ReaderComponent } from './reader/reader/reader.component';
import { ImagesComponent } from './images/images/images.component';
import { AboutComponent } from './toplevel/about/about.component';
import { SettingsComponent } from './toplevel/settings/settings.component';

import { SearchScopeControlComponent } from './reader/search-scope-control2/search-scope-control.component';

// Application modules
import {AuthorizationModule} from "./auth/authorization.module";
import {NavbarModule} from "./toplevel/navbar/navbar.module"
import {HomeModule} from "./toplevel/home/home.module";
import {EditorModule} from "./editor/editor.module";
import {DocumentDisplayModule} from './reader/document/document_display.module'
import {DocumentListModule} from './reader/document-list/document-list.module'
import {SearchModule} from './search/search.module';
import {TextHelpersModule} from './text_helpers/text_helpers.module';
import { NewDocumentComponent } from './editor/new-document/new-document.component'

@NgModule({
  declarations: [
    AppComponent,

    FooterComponent,
    ReaderComponent,
    AboutComponent,
    ImagesComponent,
    SearchScopeControlComponent,
    SettingsComponent,
    NewDocumentComponent
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
    SearchModule,
    TextHelpersModule,

    StoreModule.provideStore({
      documents: documentsReducer,
      activeDocument: activeDocumentReducer,
      user: userReducer,
      uistate: uistateReducer
    })
  ],
  providers: [
    QueryParser, Constants,
    DocumentService, UserService,
    MailService, WindowRef
  ],
  bootstrap: [AppComponent, [ ]]
})
export class AppModule { }

