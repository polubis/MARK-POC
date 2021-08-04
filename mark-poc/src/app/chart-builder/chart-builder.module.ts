import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpiForecastBuilderComponent} from "./epi-forecast-builder.component";
import {ChartPresenterModule} from "../chart-presenter/chart-presenter.module";

const CHARTS = [
  EpiForecastBuilderComponent,
];

@NgModule({
  imports: [CommonModule, ChartPresenterModule],
  declarations: CHARTS,
  entryComponents: CHARTS,
  exports: CHARTS,
})
export class ChartBuilderModule {}
