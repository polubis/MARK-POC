import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getObjectConfigForDynamicChart } from '../chart-presenter/config/epi-forecast';

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
  template: `<app-chart-epi-forecast
  [id]="'chart'"
    [data]="preparedData"
  ></app-chart-epi-forecast>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpiForecastBuilderComponent {
  private _chartData: any;

  preparedData: any;

  get chartData(): any {
    return this._chartData;
  }

  @Input()
  set chartData(value: any) {
    this._chartData = value;

    if (value) {
      this.prepareData(value.data.labels);
    }
  }

  prepareData(yearData: EpiForecastSingleSeries[]) {
    let chartData = getObjectConfigForDynamicChart();

    let ser: any = [];

    yearData.forEach((e) => {
      ser.push({
        name: e.name,
        data: [e.years[0].output],
      });
    });

    chartData.series = ser;
    this.preparedData = chartData;
  }
}
