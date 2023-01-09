import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_BOOKS } from 'data/books';

/**
 * getAllBooks
 */

export async function getAllBooks() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_BOOKS,
  });

  const books = data?.data.books.edges.map(({ node = {} }) => node);

  return {
    books: Array.isArray(books) && books.map(mapBookData),
  };
}

/**
 * mapBookData
 */

export function mapBookData(book = {}) {
  const data = {
    ...book,
    ...book.book,
  };

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  delete data.book;

  return data;
}
