import { DailyCases } from './types';

export interface AccumulatedDailyCases {
  date: Date;
  cumulativeTotalCases: number;
  cumulativeDeaths: number;
  alertLevel?: number;
  notes?: string;
}

export const getAccumulatedData = (data: DailyCases[]): AccumulatedDailyCases[] => {
  const accumulated = data.reduce((acc, val) => {
    const date = val.date;
    const newCombinedCases = val.newConfirmedCases + val.newProbableCases - val.probableCasesConfirmed;
    const newDeaths = val.newDeaths;

    if (acc.length === 0) {
      acc.push({ date: date, cumulativeTotalCases: newCombinedCases, cumulativeDeaths: newDeaths });
      return acc;
    } else {
      const [previousAccumulatedValue] = acc.slice(-1);
      const nextEntry = {
        date: date,
        cumulativeTotalCases: previousAccumulatedValue.cumulativeTotalCases + newCombinedCases,
        cumulativeDeaths: previousAccumulatedValue.cumulativeDeaths + newDeaths,
        alertLevel: val.alertLevel,
        notes: val.notes
      };
      acc.push(nextEntry);
      return acc;
    }
  }, [] as AccumulatedDailyCases[]);

  return accumulated;
};
