import { gql } from '@apollo/client';

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    categories {
      edges {
        node {
          categoryId
          id
          name
          slug
        }
      }
    }
    date
    title
    postId
    slug
  }
`;

export const QUERY_ALL_POSTS_INDEX = gql`
  ${POST_FIELDS}
  {
    posts(first: 10000) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const QUERY_ALL_POSTS_ARCHIVE = gql`
  ${POST_FIELDS}
  {
    posts(first: 10000) {
      edges {
        node {
          ...PostFields
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
            }
          }
          excerpt
          isSticky
        }
      }
    }
  }
`;

export const QUERY_ALL_POSTS = gql`
  ${POST_FIELDS}
  {
    posts(first: 10000) {
      edges {
        node {
          ...PostFields
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
            }
          }
          content
          modifiedGmt
          post {
            cardtitle
            video
          }
          isSticky
        }
      }
    }
  }
`;

export function getQueryPostBySlug(slug) {
  return gql`
    query {
      postBy(slug: "${slug}"){
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
          }
        }
        id
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
            }
          }
        }
        content
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modifiedGmt
        postId
        post {
          cardtitle
          video
        }
        title
        slug
        isSticky
      }
    }
  `;
}

export function getQueryPostsByCategoryId(categoryId) {
  return gql`
    query {
      posts(where: { categoryId: ${categoryId} }) {
        edges {
          node {
            author {
              node {
                avatar {
                  height
                  url
                  width
                }
                id
                name
                slug
              }
            }
            id
            categories {
              edges {
                node {
                  categoryId
                  id
                  name
                  slug
                }
              }
            }
            content
            date
            excerpt
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
            modifiedGmt
            postId
            post {
              cardtitle
              video
            }
            title
            slug
            isSticky
          }
        }
      }
    }
  `;
}

export function getQueryPostsByAuthorSlug(slug) {
  return gql`
    query {
      posts(where: {authorName: "${slug}"}) {
        edges {
          node {
            categories {
              edges {
                node {
                  categoryId
                  id
                  name
                  slug
                }
              }
            }
            date
            excerpt
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
            modifiedGmt
            postId
            post {
              cardtitle
              video
            }
            slug
            title
            isSticky
          }
        }
      }
    }
  `;
}
