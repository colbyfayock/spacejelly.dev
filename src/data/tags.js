import { gql } from '@apollo/client';

export const QUERY_ALL_TAGS = gql`
  query AllTags {
    tags(first: 10000) {
      edges {
        node {
          slug
          uri
          name
          tag {
            logo {
              sourceUrl
              mediaDetails {
                height
                width
              }
            }
          }
        }
      }
    }
  }
`;
