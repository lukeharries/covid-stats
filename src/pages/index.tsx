import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React from "react";
import Layout from "../components/gatsby/layout";
import SEO from "../components/gatsby/seo";
import { CumulativeTotalChart } from "../components/stats/cumulative-total-chart";
import { CumulativeTotalLogChart } from "../components/stats/cumulative-total-log-chart";
import { DailyNewCasesChart } from "../components/stats/daily-new-cases-chart";
import { getAccumulatedData } from "../data-utils/accumulate-cases";
import { daysSince100Cases } from "../data-utils/days-since";
import { lastUpdatedDate } from "../data-utils/last-updated";
import { useStats } from "../data-utils/useStats";

const IndexPage: React.FC = () => {
  const covidStats = useStats();
  const accumulatedStats = getAccumulatedData(covidStats);
  return (
    <Layout>
      <SEO />

      <header className="cs-header">
        <div className="cs-header__container">
          <h1 className="cs-header__header">NZ Covid-19 Stats</h1>
          <p className="cs-header__preamble">
            This website charts some of the key statistics of the COVID-19
            epidemic in New Zealand.
          </p>
          <p className="cs-header__preamble">
            This data is sourced from the Ministry of Health. Data is manually
            updated, so may not reflect the latest data, or may contain errors.
          </p>
          <p className="cs-header__last-updated">
            Last updated: {format(lastUpdatedDate(covidStats), "PPPP")}
          </p>
        </div>
      </header>
      <div className="cs-content">
        <main>
          <div className="cs-content__section-outer cs-key-stats">
            <div className="cs-content__section-inner">
              <h2 className="cs-key-stats__heading">Key Stats</h2>
              <div className="cs-key-stats__inner-container">
                <div className="cs-key-stats__stat">
                  <span className="cs-key-stats__stat-value">
                    {
                      accumulatedStats[accumulatedStats.length - 1]
                        .cumulativeTotalCases
                    }
                  </span>
                  <span className="cs-key-stats__stat-name">
                    Total Cases
                    <br /> (Confirmed + Probable)
                  </span>
                </div>
                <div className="cs-key-stats__stat">
                  <span className="cs-key-stats__stat-value">
                    {
                      accumulatedStats[accumulatedStats.length - 1]
                        .cumulativeDeaths
                    }
                  </span>
                  <span className="cs-key-stats__stat-name">Total Deaths</span>
                </div>
                <div className="cs-key-stats__stat">
                  <span className="cs-key-stats__stat-value">
                    {daysSince100Cases(accumulatedStats)}
                  </span>
                  <span className="cs-key-stats__stat-name">
                    Days since 100 Cases
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="cs-content__section-outer cs-charts">
            <div className="cs-content__section-inner">
              <h2 className="cs-charts__heading">Charts</h2>
              <div className="cs-charts-chart">
                <h3 className="cs-charts-chart__heading">
                  Cumulative Total Cases
                </h3>
                <div className="cs-charts-chart__wrapper">
                  <CumulativeTotalChart cumulativeStats={accumulatedStats} />
                </div>
              </div>
              <div className="cs-charts-chart">
                <h3 className="cs-charts-chart__heading">
                  Cumulative Total Cases (Log Scale)
                </h3>
                <div className="cs-charts-chart__wrapper">
                  <CumulativeTotalLogChart cumulativeStats={accumulatedStats} />
                </div>
              </div>
              <div className="cs-charts-chart">
                <h3 className="cs-charts-chart__heading">Daily New Cases</h3>
                <div className="cs-charts-chart__wrapper">
                  <DailyNewCasesChart dailyStats={covidStats} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer className="cs-footer">
        <div className="cs-footer__container">
          <p className="cs-footer__text">Created by Luke Harries</p>
          <div className="cs-footer__socials-wrapper">
            <a className="cs-footer__social-link" href="https://lukeharries.nz" target="blank">
              <FontAwesomeIcon icon={faUserCircle} className="cs-footer__social-link-icon" />
            </a>
            <a className="cs-footer__social-link" href="https://www.linkedin.com/in/lukejosephharries/" target="blank">
              <FontAwesomeIcon icon={faLinkedinIn} className="cs-footer__social-link-icon" />
            </a>
            <a className="cs-footer__social-link" href="https://github.com/lukeharries" target="blank">
              <FontAwesomeIcon icon={faGithub} className="cs-footer__social-link-icon" />
            </a>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default IndexPage;
