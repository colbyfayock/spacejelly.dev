import { gql } from '@apollo/client';

export const QUERY_SITE_DATA = gql`
  query SiteData {
    generalSettings {
      description
      language
      title
    }
  }
`;
