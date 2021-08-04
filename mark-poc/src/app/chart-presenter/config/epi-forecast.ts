import { AxisTypeValue } from 'highcharts-newest';

export interface EpiForecastDynamicChart {
  chart?: Object;
  series?: any;
  credits?: Object;
  title?: Object;
  subtitle?: Object;
  xAxis?: {
    crosshair?: boolean;
    categories?: any;
  };
  yAxis?: Object;
  labels?: Object;
  legend?: Object;
  tooltip?: Object;
  plotOptions?: Object;
  exporting?: Object;
}

export interface EpiForecastStaticChart {
  chart: Object;
  series: any;
  credits: Object;
  title: Object;
  subtitle: Object;
  xAxis: any;
  yAxis: Object;
  labels: Object;
  legend: Object;
  plotOptions: Object;
}

export function getObjectConfigForDynamicChart(): EpiForecastDynamicChart {
  return {
    chart: {
      type: 'column',
      renderTo: 'chart',
    },
    series: [],
    credits: {
      enabled: false,
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
    },
    labels: {
      items: [
        {
          html: '',
          style: {
            left: '50px',
            top: '18px',
            color: 'black',
          },
        },
      ],
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false,
        },
      },
      series: {
        animation: false,
      },
    },
    exporting: {},
  };
}
