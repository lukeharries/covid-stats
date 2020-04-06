/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import '../../scss/_all.scss';

const Layout: React.FC = props => {
  const { children } = props;
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <header className="cs-header">
        <div className="cs-header__container">
          <h1 className="cs-header__header">{data.site.siteMetadata.title}</h1>
        </div>
      </header>
      <div className="cs-content">
        <main>{children}</main>
      </div>
      <footer className="cs-footer">
        <div className="cs-footer__container">
          <span className="cs-footer__text">Created by Luke Harries</span>
        </div>
      </footer>
    </>
  );
};

export default Layout;
