import { gql } from '@apollo/client';

export const QUERY_ALL_PAGES = gql`
  query AllPages {
    pages(first: 10000) {
      edges {
        node {
          content
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
          id
          menuOrder
          slug
          title
        }
      }
    }
  }
`;

export function getQueryPageById(id) {
  return gql`
    query PageById {
      page(id: "${id}") {
        content
        featuredImage {
          node {
            altText
            caption
            id
            sizes
            sourceUrl
            srcSet
            mediaDetails {
              height
              width
            }
          }
        }
        id
        menuOrder
        slug
        title
      }
    }
  `;
}
