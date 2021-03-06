/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

type MetaData =
  | {
      name: string;
      content: any;
      property?: undefined;
    }
  | {
      property: string;
      content: any;
      name?: undefined;
    };

export interface SEOProps {
  description?: string;
  lang?: string;
  meta?: MetaData[];
  title?: string;
}

const SEO: React.FC<SEOProps> = props => {
  const { description, lang, meta, title } = props;
  const language = lang ?? 'en';

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  const metaData = [
    {
      name: `description`,
      content: metaDescription
    },
    {
      property: `og:title`,
      content: title
    },
    {
      property: `og:description`,
      content: metaDescription
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      name: `twitter:card`,
      content: `summary`
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author
    },
    {
      name: `twitter:title`,
      content: title
    },
    {
      name: `twitter:description`,
      content: metaDescription
    }
  ].concat(meta ?? []);

  return (
    <Helmet
      htmlAttributes={{
        language
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={metaData}
    />
  );
};

export default SEO;
