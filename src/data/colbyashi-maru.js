import { gql } from '@apollo/client';

export const QUERY_ALL_CM_EPISODES = gql`
  query AllCmEpisodes {
    cmEpisodes(first: 10000) {
      edges {
        node {
          content
          episode {
            company
            date
            name
            role
            twitterhandle
            youtube
          }
          featuredImage {
            node {
              altText
              sourceUrl
              sizes
              srcSet
              slug
            }
          }
          id
          slug
          title
        }
      }
    }
  }
`;
