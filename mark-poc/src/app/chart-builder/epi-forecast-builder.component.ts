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
  };
}


@Component({
  selector: 'app-epi-forecast-builder',
  template: `<app-chart-epi-forecast [data]="chartData"></app-chart-epi-forecast>`,
})
export class EpiForecastBuilderComponent implements OnInit {

  @Input() chartData: any;

  ngOnInit() {
    this.prepareData(this.chartData);
  }

  prepareData(yearData: EpiForecastSingleSeries[]) {
    let chartData = getObjectConfigForDynamicChart();

    let yearChart = [];

    console.log(chartData);

    yearData.forEach((labelRow) => {
      // If a label is disabled, no bar should be displayed for it
      if (!labelRow.isEnabled) {
        return;
      }

      // Determine if y-axis value is starter value or waterfall minus value
      let yAxisValue: number;
      if (labelRow.fieldType == 'number') {
        yAxisValue = labelRow.years.input;
      } else {
        yAxisValue = -labelRow.years.diff;
      }

      let newBar = {
        name: labelRow.name,
        y: yAxisValue,
        color: 'rgba(32,154,187,1)',
      };

      yearChart.push(newBar);
    });

    // Add total bar
    yearChart.push({
      name: 'Total',
      isSum: true,
      color: 'rgba(32,154,187,1)',
    });

    chartData.series[0].data = yearChart;

    this.chartData = chartData;
  }

}
