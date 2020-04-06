import { compareAsc } from 'date-fns';
import { graphql, useStaticQuery } from 'gatsby';
import { DailyCases } from './types';
import { parseFromTimeZone } from 'date-fns-timezone';

export const useStats = (): DailyCases[] => {
  const { allMongodbCovidstatsDailycasesnz } = useStaticQuery(graphql`
    query DailyStatsQuery {
      allMongodbCovidstatsDailycasesnz {
        edges {
          node {
            id
            newConfirmedCases
            newDeaths
            newProbableCases
            date
            probableCasesConfirmed
          }
        }
      }
    }
  `);

  const rawCases = allMongodbCovidstatsDailycasesnz.edges as { node: DailyCases }[];
  const dailyCases = rawCases.map(
    (doc): DailyCases => {
      return {
        ...doc.node,
        date: parseFromTimeZone(`${doc.node.date}T9:00:00`, { timeZone: 'Pacific/Auckland' })
      };
    }
  );

  return dailyCases.sort(sortDocuments);
};

const sortDocuments = (l: DailyCases, r: DailyCases) => {
  return compareAsc(l.date, r.date);
};
