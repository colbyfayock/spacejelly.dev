import { gql } from '@apollo/client';

export const QUERY_ALL_BOOKS = gql`
  query AllBooks {
    books {
      edges {
        node {
          id
          book {
            booklink
          }
          featuredImage {
            node {
              altText
              caption
              mediaDetails {
                height
                width
              }
              sourceUrl
              srcSet
              sizes
              id
            }
          }
          title
        }
      }
    }
  }
`;
