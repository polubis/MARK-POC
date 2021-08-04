import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as EpiForecastJson from './api/epi-forecast.json';

const DATA = {
  epiForecast: null,
};

@Injectable({ providedIn: 'root' })
export class ResultsProvider {
  private _subs = new Subscription();

  private _event = new Subject<{
    obs$: Observable<any>;
    map: (res: any, data: any) => any;
  }>();
  event$ = this._event.asObservable();

  private _data = new BehaviorSubject(DATA);
  data$ = this._data.asObservable();

  constructor() {
    this._subs.add(
      this.event$
        .pipe(
          switchMap(({ obs$, map }) =>
            obs$.pipe(
              tap((res) => {
                console.log('Siema from results provider');
                this._data.next(map(res, this._data.getValue()));
              })
            )
          )
        )
        .subscribe()
    );
  }

  getEpiForecast = () => {
    const obs$ = of(EpiForecastJson);

    this._event.next({
      obs$,
      map: (res, data) => ({
        ...data,
        epiForecast: res,
      }),
    });

    return obs$;
  };

  updateEpiForecast = (payload: any) => {
    const obs$ = of(EpiForecastJson);

    this._event.next({
      obs$, // here will be api call
      map: (res, data) => ({
        ...data,
        epiForecast: res,
      }),
    });

    return obs$;
  };

  unsubscribe = () => {
    this._subs.unsubscribe();
  };
}
