import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatRadioModule} from '@angular/material/radio';
import { EpiForecastFormComponent } from './epi-forecast-form.component';
import { EpiForecastFormContainer } from './epi-forecast-form.container';

@NgModule({
  declarations: [
    AppComponent,
    EpiForecastFormComponent,
    EpiForecastFormContainer
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
