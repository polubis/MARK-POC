import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import EpiForecastJson from './api/epi-forecast.json';
import { ChartsStore } from './charts.store';

@Injectable({ providedIn: 'root' })
export class ResultsProvider {
  data$ = this._chartsStore.data$;

  constructor(private _chartsStore: ChartsStore) {}

  getEpiForecast = () => {
    this._chartsStore.dispatchLoad(
      'epiForecast',
      of(EpiForecastJson).pipe(delay(300)),
      (value, r) => r
    );
  };

  updateEpiForecast = (payload: any) => {
    const obs$ = of({
      ...EpiForecastJson,
      data: {
        ...EpiForecastJson.data,
        labels: [
          ...EpiForecastJson.data.labels,
          {
            ...EpiForecastJson.data.labels[0],
          },
        ],
      },
    }).pipe(delay(3000));

    this._chartsStore.dispatchUpdate('epiForecast', obs$, (value, r) => r);
  };
}
