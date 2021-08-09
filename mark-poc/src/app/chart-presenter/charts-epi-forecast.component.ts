import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts-newest';

@Component({
  selector: 'app-chart-epi-forecast',
  template: ` <div
    [id]="id"
    style="min-width:200px; height:400px; margin:0 auto"
  ></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartEpiForecastComponent {
  @Input() id: string;
  private _data: any;

  get data(): any {
    return this._data;
  }
  handler: any = null;

  @Input()
  set data(value: any) {
    setTimeout(() => {
      this._data = value;

      if (value) {
        if (this.handler) {
          this.handler.destroy();
        }
        this.handler = Highcharts.chart(value);
      }
    });
  }
}
