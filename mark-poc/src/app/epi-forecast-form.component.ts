import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

const form = new FormGroup({
  forecastType: new FormControl(null),
  timeSettings: new FormControl(''),
  additionalOptions: new FormControl(''),
});

@Component({
  selector: 'app-epi-forecast-form-component',
  templateUrl: './epi-forecast-form.component.html',
  styleUrls: ['./epi-forecast-form.component.scss'],
})
export class EpiForecastFormComponent {
  @Output() changed = new EventEmitter<typeof form>();

  form = form;

  forecastTypes = [
    {
      label: 'Include top down forecast',
    },
    {
      label: 'Include patients number to define',
    },
  ];

  valueChanged$ = this.form.valueChanges.pipe(
    tap((value) => this.changed.emit(value))
  );
}
