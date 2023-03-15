import { gql } from '@apollo/client';

export const QUERY_ALL_COURSES = gql`
  query AllCourses {
    courses {
      edges {
        node {
          id
          course {
            courseLink
            platformid
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
