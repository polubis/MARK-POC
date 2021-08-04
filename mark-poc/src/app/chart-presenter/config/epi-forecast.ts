import { AxisTypeValue } from 'highcharts';

export interface EpiForecastDynamicChart {
  chart?: Object;
  series?: any;
  credits?: Object;
  title?: Object;
  subtitle?: Object;
  xAxis?: {
    type?: AxisTypeValue;
    labels?: any;
    categories: any;
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
      type: 'waterfall',
      renderTo: 'chart',
      marginBottom: 140,
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      type: 'category',
      labels: {
        align: 'right',
        rotation: -37,
        style: {
          fontSize: '11px',
          fontFamily: 'Roboto, sans-serif',
        },
        formatter: function () {
          var newValue = '' + this.value; // Cast to string
          newValue = newValue.replace(/&nbsp;/gi, ''); // Remove &nbsp; from label
          return newValue;
        },
        zIndex: -1,
      },
      categories: null,
    },
    yAxis: {
      title: null,
      endOnTick: false,
      startOnTick: false,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        // let labelName = this.points[0].key;
        // let roundPatients = Math.ceil(this.y);
        // return labelName + `<br><b>${roundPatients}</b> patients`; // TODO filter number
        return 'test todo';
      },
      shared: true,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        stickyTracking: true,
      },
      column: {
        minPointLength: 100000,
      },
    },
    series: [
      {
        upColor: 'rgba(32,154,187,1)',
        color: 'rgba(32,154,187,1)',
        data: [],
        pointPadding: 0,
      },
    ],
    exporting: {},
  };
}
