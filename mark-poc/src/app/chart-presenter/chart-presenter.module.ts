import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ChartEpiForecastComponent} from "./charts-epi-forecast.component";

const CHARTS = [
  ChartEpiForecastComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: CHARTS,
  entryComponents: CHARTS,
  exports: CHARTS,
})
export class ChartPresenterModule {}
