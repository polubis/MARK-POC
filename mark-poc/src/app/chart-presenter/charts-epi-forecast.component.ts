import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts-newest';

import { EpiForecastDynamicChart } from './config/epi-forecast';

@Component({
  selector: 'app-chart-epi-forecast',
  template: `<div
    id="chart"
    style="min-width:200px; height:400px; margin:0 auto"
  ></div>`,
})
export class ChartEpiForecastComponent implements OnInit {
  @Input() data: any;

  handler: any = null;

  ngOnInit() {
    this.handler = Highcharts.chart(this.data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.handler !== null) {
      this.handler.destroy();
      this.handler = Highcharts.chart(changes.data.currentValue);
    }
  }
}
