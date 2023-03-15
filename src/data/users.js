import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
  query AllUsers {
    users(first: 10000) {
      edges {
        node {
          description
          id
          name
          roles {
            nodes {
              name
            }
          }
          slug
          user {
            userimage {
              mediaDetails {
                height
                width
              }
              sourceUrl
            }
            githuburl
          }
          seo {
            social {
              twitter
              youTube
            }
          }
        }
      }
    }
  }
`;
