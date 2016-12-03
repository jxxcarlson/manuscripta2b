import { RouterModule, Routes } from '@angular/router';
import { Constants } from './toplevel/constants'

import { StoreModule } from '@ngrx/store';
import { documentsReducer } from './reducers/documents.reducer'
import { activeDocumentReducer } from './reducers/activeDocument.reducer'
import {DocumentService} from './services/document.service';

import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreLogMonitorModule, useLogMonitor} from '@ngrx/store-log-monitor';

import {provideStore} from '@ngrx/store';


// StoreModule.provideStore( {'documents'})

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './toplevel/app/app.component';
import { NavbarComponent } from './toplevel/navbar/navbar.component';
import { FooterComponent } from './toplevel/footer/footer.component';
import { DocumentComponent } from './reader/document/document.component';
import { ReaderComponent } from './reader/reader/reader.component';
import { EditorComponent } from './editor/editor/editor.component';
import { ImagesComponent } from './images/images/images.component';

import { HtmlPane } from './shared/htmlpane.component';
import { MathJaxPane } from './shared/mathjaxpane.component';
import { TextPane } from './shared/textpane.component';

import { ApiService } from './services/api.service';
import { SigninService } from './services/signin.service'
import { QueryParser } from './services/queryparser.service';
import { MathJaxDirective } from './directives/mathjax.directive';

import { TextPageHeightDirective } from './directives/textpageheight.directive';
import { DocumentListComponent } from './reader/document-list/document-list.component';
import { DocumentListItemComponent } from './reader/document-list-item/document-list-item.component';
import { SearchComponent } from './reader/search/search.component';
import { AboutComponent } from './toplevel/about/about.component';

import { HomeComponent } from './toplevel/home/home.component';
import { SearchScopeControlComponent } from './reader/search-scope-control2/search-scope-control.component';
import { SettingsComponent } from './toplevel/settings/settings.component';


//{ path: 'hero/:id', component: HeroDetailComponent },
//{ path: '**', component: PageNotFoundComponent }

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent},
  { path: 'read', component: ReaderComponent },
  { path: 'edit', component: EditorComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DocumentComponent,
    ReaderComponent,
    HtmlPane, TextPane, MathJaxDirective, TextPageHeightDirective,
    DocumentListComponent, DocumentListItemComponent,
    MathJaxPane,
    SearchComponent,
    AboutComponent,
    HomeComponent,
    EditorComponent,
    ImagesComponent,
    SearchScopeControlComponent,
    SettingsComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.provideStore({ documents: documentsReducer, activeDocument: activeDocumentReducer })
  ],
  providers: [
    QueryParser, ApiService, SigninService, Constants,
    DocumentService
  ],
  bootstrap: [AppComponent, [ ]]
})
export class AppModule { }

