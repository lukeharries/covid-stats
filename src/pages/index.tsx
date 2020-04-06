import { format } from 'date-fns';
import React from 'react';
import Layout from '../components/gatsby/layout';
import SEO from '../components/gatsby/seo';
import { CumulativeTotalChart } from '../components/stats/cumulative-total-chart';
import { CumulativeTotalLogChart } from '../components/stats/cumulative-total-log-chart';
import { DailyNewCasesChart } from '../components/stats/daily-new-cases-chart';
import { getAccumulatedData } from '../data-utils/accumulate-cases';
import { daysSince100Cases } from '../data-utils/days-since';
import { lastUpdatedDate } from '../data-utils/last-updated';
import { useStats } from '../data-utils/useStats';

const IndexPage: React.FC = () => {
  const covidStats = useStats();
  const accumulatedStats = getAccumulatedData(covidStats);

  return (
    <Layout>
      <SEO />
      <div className="cs-content__section-outer cs-summary-section">
        <div className="cs-content__section-inner">
          <p>This website charts some of the key statistics of the COVID-19 epidemic in New Zealand.</p>
          <p>
            This data is sourced from the Ministry of Health. Data is manually updated, so may not reflect the latest
            data, or may contain errors.
          </p>
          <p>Last updated: {format(lastUpdatedDate(covidStats), 'PPPP')}</p>
        </div>
      </div>

      <div className="cs-content__section-outer cs-key-stats">
        <div className="cs-content__section-inner">
          <h2 className="cs-key-stats__heading">Key Stats</h2>
          <div className="cs-key-stats__inner-container">
            <div className="cs-key-stats__stat">
              <span className="cs-key-stats__stat-name">
                Total Cases
                <br /> (Confirmed + Probable)
              </span>
              <span className="cs-key-stats__stat-value">
                {accumulatedStats[accumulatedStats.length - 1].cumulativeTotalCases}
              </span>
            </div>
            <div className="cs-key-stats__stat">
              <span className="cs-key-stats__stat-name">Total Deaths</span>
              <span className="cs-key-stats__stat-value">
                {accumulatedStats[accumulatedStats.length - 1].cumulativeDeaths}
              </span>
            </div>
            <div className="cs-key-stats__stat">
              <span className="cs-key-stats__stat-name">Days since 100 Cases</span>
              <span className="cs-key-stats__stat-value">{daysSince100Cases(accumulatedStats)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cs-content__section-outer cs-charts">
        <div className="cs-content__section-inner">
          <h2>Charts</h2>
          <div>
            <h3>Cumulate Total Cases</h3>
            <div>
              <CumulativeTotalChart cumulativeStats={accumulatedStats} />
            </div>

            <h3>Cumulate Total Cases (Log Scale)</h3>
            <div>
              <CumulativeTotalLogChart cumulativeStats={accumulatedStats} />
            </div>

            <h3>Daily New Cases</h3>
            <div>
              <DailyNewCasesChart dailyStats={covidStats} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
