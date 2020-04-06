import { DailyCases } from './types';
import { AccumulatedDailyCases } from './accumulate-cases';
import { differenceInCalendarDays } from 'date-fns';

export const lastUpdatedDate = (dailyCases: DailyCases[]): Date => {
  const [lastEntry] = dailyCases.slice(-1);
  return lastEntry.date;
};
