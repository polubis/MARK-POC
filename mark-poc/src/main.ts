import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const highcharts = require('highcharts');
Object.defineProperty(window, 'Highcharts', { value: highcharts });

require('highcharts/highcharts-more')(window.Highcharts);
require('highcharts/modules/annotations')(window.Highcharts);
require('highcharts/modules/exporting')(window.Highcharts);
require('highcharts/modules/offline-exporting')(window.Highcharts);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
