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
        legend: 'none',
        animation: {
          startup: true,
          duration: 1200,
          easing: 'inAndOut'
        },
        hAxis: {
          maxValue: endDate
        },
        vAxis: {
          maxValue: chartCasesMax,
          title: 'Total Cases'
        }
      }}
    />
  );
};
