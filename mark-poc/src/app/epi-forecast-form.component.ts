import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-epi-forecast-form-component',
  templateUrl: './epi-forecast-form.component.html',
  styleUrls: ['./epi-forecast-form.component.scss'],
})
export class EpiForecastFormComponent {
  form = new FormGroup({
    forecastType: new FormControl(null),
    timeSettings: new FormControl(''),
    additionalOptions: new FormControl(''),
  });

  forecastTypes = [
    {
      label: 'Include top down forecast',
    },
    {
      label: 'Include patients number to define',
    },
  ];
}
