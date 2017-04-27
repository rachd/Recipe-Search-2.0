import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { appRouting } from './app.routing';
import { CoreModule }   from './core/core.module';
import { AppComponent } from './app.component';
import { RecipesFormComponent } from './recipes/recipes-form/recipes-form.component';

@NgModule({
  declarations: [
    AppComponent,
    appRouting.components,
    RecipesFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    appRouting.routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
