import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DocumentComponent } from './document/document.component';
import { ReaderComponent } from './reader/reader.component';

import { HtmlPane } from './shared/htmlpane.component';
import { MathJaxPane } from './shared/mathjaxpane.component';
import { TextPane } from './shared/textpane.component';

import { ApiService } from './shared/api.service';
import { DocumentNotificationService } from './shared/document-notification.service';
import { QueryParser } from './shared/queryparser.service';
import { MathJaxDirective } from './shared/mathjax.directive';

import { TextPageHeightDirective } from './shared/textpageheight.directive';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentListItemComponent } from './document-list-item/document-list-item.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';


//{ path: 'hero/:id', component: HeroDetailComponent },
//{ path: '', component: HomeComponent },
//{ path: '**', component: PageNotFoundComponent }

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'read', component: ReaderComponent },
  { path: '666', component: ReaderComponent }
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
  bootstrap: [AppComponent]
})
export class AppModule { }
