import { isAfter } from 'date-fns';
import { addDays } from 'date-fns/esm';
import React from 'react';
import { Chart } from 'react-google-charts';
import { DailyCases } from '../../data-utils/types';

export interface DailyNewCasesChartProps {
  dailyStats: DailyCases[];
}

export const DailyNewCasesChart: React.FC<DailyNewCasesChartProps> = props => {
  const { dailyStats } = props;

  const [lastValue] = dailyStats.slice(-1);
  const endDate = addDays(lastValue.date, 5);

  const chartCasesMax =
    dailyStats
      .map(data => data.newConfirmedCases + data.newProbableCases)
      .reduce(function(a, b) {
        return Math.max(a, b);
      }) * 1.1;

  const chartData = dailyStats
    .filter(data => isAfter(data.date, new Date('2020-03-22')))
    .map(data => {
      return [data.date, data.newConfirmedCases, data.newProbableCases];
    });

  return (
    <Chart
      width={'100%'}
      height={500}
      chartType="ColumnChart"
      loader={<div>Loading Chart</div>}
      data={[
        [
          { type: 'date', label: 'Date' },
          { type: 'number', label: 'New Confirmed Cases' },
          { type: 'number', label: 'New Probable Cases' }
        ],
        ...chartData
      ]}
      options={{
        legend: 'top',
        bar: { groupWidth: '75%' },
        isStacked: true,
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
          title: 'Cases'
        }
      }}
    />
  );
};
