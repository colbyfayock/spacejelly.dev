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
    tags {
      edges {
        node {
          id
          name
          uri
        }
      }
    }
    title
    postId
    slug
  }
`;

export const QUERY_ALL_POSTS_INDEX = gql`
  ${POST_FIELDS}
  query AllPostsIndex {
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
  query AllPostsArchive {
    posts(first: 10000) {
      edges {
        node {
          ...PostFields
          author {
            node {
              user {
                userimage {
                  mediaDetails {
                    height
                    width
                  }
                  sourceUrl
                }
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
  query AllPosts {
    posts(first: 10000) {
      edges {
        node {
          ...PostFields
          author {
            node {
              user {
                userimage {
                  mediaDetails {
                    height
                    width
                  }
                  sourceUrl
                }
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
            demorepourl
            demostarterurl
            demowebsiteurl
            video
          }
          isSticky
        }
      }
    }
  }
`;

export const QUERY_POST_BY_SLUG = gql`
  query PostBySlug($slug: String!) {
    postBy(slug: $slug) {
      author {
        node {
          user {
            userimage {
              mediaDetails {
                height
                width
              }
              sourceUrl
            }
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
        demorepourl
        demostarterurl
        demowebsiteurl
        video
      }
      tags {
        edges {
          node {
            id
            name
            uri
          }
        }
      }
      title
      slug
      isSticky
      seo {
        metaDesc
      }
    }
  }
`;

export const QUERY_POSTS_BY_CATEGORY_ID_INDEX = gql`
  ${POST_FIELDS}
  query PostByCategoryIdIndex($categoryId: Int!) {
    posts(where: { categoryId: $categoryId }) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE = gql`
  ${POST_FIELDS}
  query PostByCategoryIdArchive($categoryId: Int!) {
    posts(where: { categoryId: $categoryId }) {
      edges {
        node {
          ...PostFields
          author {
            node {
              user {
                userimage {
                  mediaDetails {
                    height
                    width
                  }
                  sourceUrl
                }
              }
              id
              name
              slug
            }
          }
          date
          excerpt
          postId
          isSticky
        }
      }
    }
  }
`;

export function getQueryPostsByAuthorSlug(slug) {
  return gql`
    query PostByAuthorslug {
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
              demorepourl
              demostarterurl
              demowebsiteurl
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

export const QUERY_POSTS_BY_TAG_SLUG_INDEX = gql`
  ${POST_FIELDS}
  query PostByTagSlugIndex($tagSlug: [String]!) {
    posts(where: { tagSlugIn: $tagSlug }) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_TAG_SLUG_ARCHIVE = gql`
  ${POST_FIELDS}
  query PostByTagSlugIndex($tagSlug: [String]!) {
    posts(where: { tagSlugIn: $tagSlug }) {
      edges {
        node {
          ...PostFields
          author {
            node {
              user {
                userimage {
                  mediaDetails {
                    height
                    width
                  }
                  sourceUrl
                }
              }
              id
              name
              slug
            }
          }
          date
          excerpt
          postId
          isSticky
        }
      }
    }
  }
`;
