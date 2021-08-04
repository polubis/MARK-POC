import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {getObjectConfigForDynamicChart} from "../chart-presenter/config/epi-forecast";

export interface EpiForecastSingleSeries {
  id: number;
  name: string;
  originalName: string;
  editable: boolean;
  fieldType: string;
  isEnabled: boolean;
  order: number;
  value: number;
  years: {
    diff: number;
    field: number;
    input: number;
    output: number;
  }[];
}


@Component({
  selector: 'app-epi-forecast-builder',
  template: `<app-chart-epi-forecast [data]="chartData"></app-chart-epi-forecast>`,
})
export class EpiForecastBuilderComponent implements OnInit {

  @Input() chartData: any;

  ngOnInit() {
    this.prepareData(this.chartData.data.labels);
  }

  prepareData(yearData: EpiForecastSingleSeries[]) {
    let chartData = getObjectConfigForDynamicChart();

    let ser: any = [];

    yearData.forEach(e => {
      ser.push({
        name: e.name,
        data: [e.years[0].output]
      });
    })

    chartData.series = ser;
    this.chartData = chartData;
  }

}
