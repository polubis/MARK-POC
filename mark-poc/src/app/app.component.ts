import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ResultsProvider } from './results.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data$ = this.resultsProvider.data$;

  constructor(
    private resultsProvider: ResultsProvider
  ) {
  }

  ngOnInit() {
    this.getEpiForecastData();
  }

  getEpiForecastData = () => {
    this.resultsProvider
      .getEpiForecast()
      .pipe(
        tap((r) => {
          console.log(r);
          console.log('siema from AppComponent');
        })
      )
      .subscribe();
  };
}
