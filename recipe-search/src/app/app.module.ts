import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { appRouting } from './app.routing';
import { CoreModule }   from './core/core.module';
import { AppComponent } from './app.component';

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
    appRouting.routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
