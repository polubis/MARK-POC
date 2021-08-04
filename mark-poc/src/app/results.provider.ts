import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import * as EpiForecastJson from './api/epi-forecast.json';

const DATA = {
  epiForecast: null,
};

@Injectable({ providedIn: 'root' })
export class ResultsProvider {
  private _data = new BehaviorSubject(DATA);
  data$ = this._data.asObservable();

  getEpiForecast = () => {
    return of(EpiForecastJson).pipe(
      tap((data) => {
        this._data.next(data as any);
      })
    );
  };

  updateEpiForecast = (payload: any) => {
    // Data
    console.log(payload);
    return of(EpiForecastJson).pipe(
      delay(300),
      tap((epiForecast: any) => {
        this._data.next({
          ...this._data.getValue(),
          epiForecast,
        });
      })
    );
  };
}
