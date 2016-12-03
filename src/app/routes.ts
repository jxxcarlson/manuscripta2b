

import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './toplevel/about/about.component'
import { HomeComponent } from './toplevel/home/home.component'
import { ReaderComponent } from './reader/reader/reader.component'
import { EditorComponent } from './editor/editor/editor.component'
import { ImagesComponent } from './images/images/images.component'
import { SettingsComponent } from './toplevel/settings/settings.component'

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent},
  { path: 'read', component: ReaderComponent },
  { path: 'edit', component: EditorComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', component: HomeComponent }
];

export const routing = RouterModule.forRoot(appRoutes)
