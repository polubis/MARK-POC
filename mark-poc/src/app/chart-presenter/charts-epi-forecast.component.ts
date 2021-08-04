import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

import { EpiForecastDynamicChart } from './config/epi-forecast';

@Component({
  selector: 'app-chart-epi-forecast',
  template: `<div id="chart" style="min-width:200px; height:400px; margin:0 auto"></div>`,
})
export class ChartEpiForecastComponent implements OnInit {
  @Input() data: EpiForecastDynamicChart;

  handler: any = null;

  ngOnInit() {
    this.handler = Highcharts.chart(this.data);
  }

}
