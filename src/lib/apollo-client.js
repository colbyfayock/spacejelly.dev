import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { removeLastTrailingSlash } from "lib/util";
let client;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  return new ApolloClient({
    link: createHttpLink({
      uri: removeLastTrailingSlash(`${process.env.WORDPRESS_HOST}/graphql`),
      useGETForQueries: true,
    }),
    cache: new InMemoryCache({
      typePolicies: {
        RootQuery: {
          queryType: true,
        },
        RootMutation: {
          mutationType: true,
        },
      },
    }),
  });
}
