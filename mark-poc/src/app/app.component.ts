import {Component, OnInit} from '@angular/core';
import {ResultsProvider} from "./results.provider";
import {switchMap, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import epiForecastData from './api/epi-forecast.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mark-poc';

  constructor(
    private resultsProvider: ResultsProvider
  ) {
  }

  epiForecastData: any = null;

  ngOnInit() {
    console.log(epiForecastData);
    this.epiForecastData = epiForecastData.data.labels;
  }

  getEpiForecastData = () => {
    this.resultsProvider
      .getEpiForecast()
      .pipe(
        tap((results) => {
          console.log(results);
        })
      )
      .subscribe();
  }
}
