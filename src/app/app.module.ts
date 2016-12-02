import { RouterModule, Routes } from '@angular/router';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreLogMonitorModule, useLogMonitor} from '@ngrx/store-log-monitor';

import {provideStore} from '@ngrx/store';
import {DocumentService} from './services/document.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DocumentComponent } from './components/document/document.component';
import { ReaderComponent } from './components/reader/reader.component';

import { HtmlPane } from './shared/htmlpane.component';
import { MathJaxPane } from './shared/mathjaxpane.component';
import { TextPane } from './shared/textpane.component';

import { ApiService } from './services/api.service';
import { DocumentNotificationService } from './services/document-notification.service';
import { QueryParser } from './services/queryparser.service';
import { MathJaxDirective } from './directives/mathjax.directive';

import { TextPageHeightDirective } from './directives/textpageheight.directive';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentListItemComponent } from './components/document-list-item/document-list-item.component';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './about/about.component';


//{ path: 'hero/:id', component: HeroDetailComponent },
//{ path: '**', component: PageNotFoundComponent }

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'read', component: ReaderComponent },
  { path: '', component: ReaderComponent }
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
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DocumentNotificationService,
    QueryParser, ApiService
  ],
  bootstrap: [AppComponent, [
    // DocumentService
  ]]
})
export class AppModule { }


// DocumentService, // The actions that consume our store
// provideStore({documents}) // The store that defines our app state
