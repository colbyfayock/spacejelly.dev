import { getApolloClient } from 'lib/apollo-client';

import { sortObjectsByDate } from 'lib/datetime';
import { mapUserData } from 'lib/users';

import {
  QUERY_ALL_POSTS,
  QUERY_ALL_POSTS_ARCHIVE,
  QUERY_ALL_POSTS_INDEX,
  QUERY_POST_BY_SLUG,
  getQueryPostsByAuthorSlug,
  QUERY_POSTS_BY_CATEGORY_ID_INDEX,
  QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE,
  QUERY_POSTS_BY_TAG_SLUG_INDEX,
  QUERY_POSTS_BY_TAG_SLUG_ARCHIVE,
} from 'data/posts';

/**
 * postPathBySlug
 */

export function postPathBySlug(slug) {
  return `/posts/${slug}`;
}

/**
 * getPostBySlug
 */

export async function getPostBySlug(slug) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_POST_BY_SLUG,
    variables: {
      slug,
    },
  });

  const post = data?.data.postBy;

  if (!post) return { post: undefined };

  return {
    post: [post].map(mapPostData)[0],
  };
}

/**
 * getAllPosts
 */

const allPostsIncludesTypes = {
  all: QUERY_ALL_POSTS,
  archive: QUERY_ALL_POSTS_ARCHIVE,
  index: QUERY_ALL_POSTS_INDEX,
};

export async function getAllPosts(options = {}) {
  const { queryIncludes = 'all' } = options;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: allPostsIncludesTypes[queryIncludes],
  });

  const posts = data?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

/**
 * getPostsByAuthorSlug
 */

export async function getPostsByAuthorSlug(slug) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: getQueryPostsByAuthorSlug(slug),
  });

  const posts = data?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

/**
 * getPostsByCategoryId
 */

const postsByCategoryIdIncludesTypes = {
  index: QUERY_POSTS_BY_CATEGORY_ID_INDEX,
  archive: QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE,
};

export async function getPostsByCategoryId(categoryId, options = {}) {
  const { queryIncludes } = options;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: postsByCategoryIdIncludesTypes[queryIncludes],
    variables: {
      categoryId,
    },
  });

  const posts = data?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

/**
 * getPostsByTagSlug
 */

const postsByTagSlugIncludesTypes = {
  index: QUERY_POSTS_BY_TAG_SLUG_INDEX,
  archive: QUERY_POSTS_BY_TAG_SLUG_ARCHIVE,
};

export async function getPostsByTagSlug(tagSlug, options = {}) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: postsByTagSlugIncludesTypes[queryIncludes],
    variables: {
      tagSlug,
    },
  });

  const posts = data?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

/**
 * getRecentPosts
 */

export async function getRecentPosts({ count, ...options }) {
  const { posts } = await getAllPosts(options);
  const sorted = sortObjectsByDate(posts);
  return {
    posts: sorted.slice(0, count),
  };
}

/**
 * sanitizeExcerpt
 */

export function sanitizeExcerpt(excerpt) {
  if (typeof excerpt !== 'string') {
    throw new Error(`Failed to sanitize excerpt: invalid type ${typeof excerpt}`);
  }

  let sanitized = excerpt;

  sanitized = sanitized.replace(/\s?\[\&hellip\;\]/, '...');
  sanitized = sanitized.replace('....', '...');

  return sanitized;
}

/**
 * mapPostData
 */

export function mapPostData(post = {}) {
  const data = {
    ...post,
    ...post.post,
  };

  // TODO: is the date not in the right format a bug?

  if (data.modifiedGmt) {
    data.modified = data.modifiedGmt;
    delete data.modifiedGmt;
  }

  // Clean up the author object to avoid someone having to look an extra
  // level deeper into the node

  if (data.author) {
    data.author = mapUserData(data.author);
  }

  // Clean up the categories to make them more easy to access

  if (data.categories) {
    data.categories = data.categories.edges.map(({ node }) => {
      return {
        ...node,
      };
    });
  }

  if (data.tags) {
    data.tags = data.tags.edges.map(({ node }) => {
      return {
        ...node,
      };
    });
  }

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  // When using the Read More feature in WordPress, the excerpt that we get from
  // our query includes it + the beginning of the content itself. We only want
  // the excerpt produced before the Read More tag, so if it exists on the post
  // try to find it and replace the excerpt with it

  const { intro } = parseIntroFromContent(data.content);

  if (intro) {
    data.excerpt = intro;
  }

  return data;
}

/**
 * parseIntroFromContent
 */

export function parseIntroFromContent(original) {
  if (!original || !original.includes('<!--more-->')) {
    return {
      content: original,
    };
  }

  const [intro, content] = original.split('<!--more-->');

  return {
    content: content && content.trim(),
    intro: intro && intro.trim(),
  };
}
