import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EpiForecastFormComponent } from './epi-forecast-form.component';
import { EpiForecastFormContainer } from './epi-forecast-form.container';
import {ChartPresenterModule} from "./chart-presenter/chart-presenter.module";
import {ChartBuilderModule} from "./chart-builder/chart-builder.module";

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
    MatRadioModule,
    MatCheckboxModule,
    ChartPresenterModule,
    ChartBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
