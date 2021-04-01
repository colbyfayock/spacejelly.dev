import { gql } from '@apollo/client';

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      edges {
        node {
          id
          title
          slug
          featuredImage {
            node {
              altText
              sourceUrl
              sizes
              srcSet
              slug
            }
          }
          product {
            order
            price
            productId
            variation
          }
        }
      }
    }
  }
`;
