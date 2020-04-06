export interface DailyCases {
  id: string;
  newConfirmedCases: number;
  newDeaths: number;
  newProbableCases: number;
  date: Date;
  probableCasesConfirmed: number;
  alertLevel?: number;
  notes?: string;
}
