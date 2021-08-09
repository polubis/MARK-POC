import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResultsProvider } from './results.provider';

@Component({
  selector: 'app-epi-forecast-form-container',
  template: `
    <app-epi-forecast-form-component
      (changed)="handleForecastFormChange($event)"
    >
    </app-epi-forecast-form-component>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpiForecastFormContainer {
  constructor(private _resultsProvider: ResultsProvider) {}

  handleForecastFormChange = (values: any) => {
    this._resultsProvider.updateEpiForecast(values);
  };
}
