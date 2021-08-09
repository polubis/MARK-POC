import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ResultsProvider } from './results.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  data$ = this.resultsProvider.data$;

  constructor(private resultsProvider: ResultsProvider) {}

  log = (c: any) => console.log(c);

  ngOnInit() {
    this.getEpiForecastData();
  }

  getEpiForecastData = () => {
    this.resultsProvider.getEpiForecast();
  };
}
