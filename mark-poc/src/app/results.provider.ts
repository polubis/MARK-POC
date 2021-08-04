import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

const DATA = {
  epiForecast: null,
};

@Injectable({ providedIn: 'root' })
export class ResultsProvider {
  private _data = new BehaviorSubject(DATA);
  data$ = this._data.asObservable();

  updateEpiForecast = (payload: any) => {
    // Data
    console.log(payload);
    return of().pipe(
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
