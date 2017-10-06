import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { appRouting } from './app.routing';
import { CoreModule }   from './core/core.module';
import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDZPBbGmdplXyj3Z2mBaqXsFsSKY3gD33o",
  authDomain: "recipe-search-72996.firebaseapp.com",
  databaseURL: "https://recipe-search-72996.firebaseio.com",
  projectId: "recipe-search-72996",
  storageBucket: "recipe-search-72996.appspot.com",
  messagingSenderId: "872814479005"
};

@NgModule({
  declarations: [
    AppComponent,
    appRouting.components,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    CoreModule,
    appRouting.routes,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
