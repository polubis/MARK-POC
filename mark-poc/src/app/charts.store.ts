import { Injectable } from '@angular/core';

import EpiForecastJson from './api/epi-forecast.json';
import { Store } from './store';

interface ChartsStoreData {
  epiForecast: typeof EpiForecastJson;
}

@Injectable({ providedIn: 'root' })
export class ChartsStore extends Store<ChartsStoreData> {
  constructor() {
    super('epiForecast');
  }
}
