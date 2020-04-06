import { differenceInCalendarDays } from 'date-fns';
import { AccumulatedDailyCases } from './accumulate-cases';

export const daysSince100Cases = (cumulativeStats: AccumulatedDailyCases[]): number => {
  const first100 = cumulativeStats.find(d => d.cumulativeTotalCases >= 100);
  return differenceInCalendarDays(Date.now(), first100!.date);
};
