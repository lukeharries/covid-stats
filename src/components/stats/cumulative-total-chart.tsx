import React from 'react';
import { Chart } from 'react-google-charts';
import { AccumulatedDailyCases } from '../../data-utils/accumulate-cases';
import { addDays } from 'date-fns/esm';

export interface CumulativeTotalChartProps {
  cumulativeStats: AccumulatedDailyCases[];
}

export const CumulativeTotalChart: React.FC<CumulativeTotalChartProps> = props => {
  const { cumulativeStats } = props;

  const [lastValue] = cumulativeStats.slice(-1);
  const endDate = addDays(lastValue.date, 5);

  const chartCasesMax =
    cumulativeStats
      .map(data => data.cumulativeTotalCases)
      .reduce(function(a, b) {
        return Math.max(a, b);
      }) * 1.1;

  const chartData = cumulativeStats
    .filter(data => data.cumulativeTotalCases > 100)
    .map(data => {
      return [data.date, data.cumulativeTotalCases, data.cumulativeDeaths, data.notes];
    });

  return (
    <Chart
      width={'100%'}
      height={500}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={[
        [
          { type: 'date', label: 'Date' },
          { type: 'number', label: 'Total Cases' },
          { type: 'number', label: 'Total Deaths' },
          { type: 'string', role: 'tooltip', label: 'Notes' }
        ],
        ...chartData
      ]}
      options={{
        legend: {
          position: 'top', 
          textStyle: {
            color: '#ffffff',
            fontName: 'Roboto',
            fontSize: 14,
          }
        },
        backgroundColor: '#222222',
        colors:['#7799cb','#E75B4C'],
        lineWidth: 4,
        // chartArea:{left:'10%',top:'10%',width:'80%',height:'80%'},
        hAxis: {
          maxValue: endDate,
          baselineColor: "#515151",
          gridlines: { color: "#515151" },
          minorGridlines: { color: "#383838" },
          textStyle: {
            color: '#ffffff',
            fontName: 'Roboto',
            fontSize: 12,
          }
        },
        vAxis: {
          maxValue: chartCasesMax,
          title: 'Total Cases',
          baselineColor: "#515151",
          gridlines: { color: "#515151" },
          minorGridlines: { color: "#383838" },
          textStyle: {
            color: '#ffffff',
            fontName: 'Roboto',
            fontSize: 12,
          },
          titleTextStyle: {
            color: '#ffffff',
            fontName: 'Roboto',
            fontSize: 12,
          },
        },
        trendlines: {
          0: {
            labelInLegend: 'Total Cases Exponential Trend',
            type: 'exponential',
            color: '#36598c',
            lineWidth: 2,
            opacity: 1,
            showR2: false,
            visibleInLegend: true
          }
        }
      }}
    />
  );
};
