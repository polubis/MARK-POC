import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-epi-forecast-form-component',
  templateUrl: './epi-forecast-form.component.html',
  styleUrls: ['./epi-forecast-form.component.scss'],
})
export class EpiForecastFormComponent {
  @Output() changed = new EventEmitter<FormGroup>();

  form: FormGroup;
  valueChanged$: Observable<FormGroup>;

  forecastTypes = [
    {
      label: 'Include top down forecast',
    },
    {
      label: 'Include patients number to define',
    },
  ];

  timeSettings = [
    { label: 'Same top down forecast value for each year', checked: false },
  ];

  constructor() {
    this.form = new FormGroup({
      forecastType: new FormControl(null),
      timeSettings: new FormGroup(
        this.timeSettings.reduce(
          (acc, ts) => ({ ...acc, [ts.label]: new FormControl(false) }),
          {}
        )
      ),
      additionalOptions: new FormControl([]),
    });

    this.valueChanged$ = this.form.valueChanges.pipe(
      tap((value) => this.changed.emit(value))
    );
  }

  handleTimeSettingCheck = ({ checked }: any, timeSetting: any) => {
    const { timeSettings } = this.form.value;
    console.log(timeSettings);
    this.form.setValue({
      timeSettings: timeSettings.map((ts: any) =>
        ts.label === timeSetting.label ? { ...ts, checked } : ts
      ),
    });
  };
}
