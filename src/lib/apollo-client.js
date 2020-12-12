import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';

import { removeLastTrailingSlash } from 'lib/site';

let apolloClient;

const WORDPRESS_HOST = removeLastTrailingSlash(process.env.WORDPRESS_HOST);
const WORDPRESS_GRAPHQL_ENDPOINT = removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT);

const DEFAULT_GRAPHQL_PATH = '/graphql';
const GRAPHQL_ENDPOINT = WORDPRESS_GRAPHQL_ENDPOINT || `${WORDPRESS_HOST}${DEFAULT_GRAPHQL_PATH}`;

/**
 * createApolloClient
 */

export function _createApolloClient() {
  const link = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPosts: concatPagination(),
          allPages: concatPagination(),
        },
      },
    },
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache,
  });
}

/**
 * initializeApollo
 */

export function initializeApollo(initialState = null) {
  const _apolloClient = getApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here

  if (initialState) {
    // Get existing cache, loaded during client side data fetching

    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data

    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client

  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

/**
 * getApolloClient
 */

export function getApolloClient() {
  return apolloClient ?? _createApolloClient();
}
