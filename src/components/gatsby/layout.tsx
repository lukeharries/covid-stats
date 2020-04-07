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
    {children}
    </>
  );
};

export default Layout;
