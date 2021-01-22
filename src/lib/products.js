import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_PRODUCTS } from 'data/products';

/**
 * getAllProducts
 */

export async function getAllProducts(options) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_PRODUCTS,
  });

  const products = data?.data.products.edges.map(({ node = {} }) => node);

  return {
    products: Array.isArray(products) && products.map(mapProductData),
  };
}

/**
 * mapProductData
 */

export function mapProductData(product = {}) {
  const data = {
    ...product,
    ...product.product,
  };

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  delete data.product;

  return data;
}
