import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_TAGS } from 'data/tags';

/**
 * getAllTags
 */

export async function getAllTags() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_TAGS,
  });

  const tags = data?.data.tags.edges.map(_mapTagData);

  return {
    tags,
  };
}

/**
 * getTagBySlug
 */

export async function getTagBySlug(tagSlug) {
  // Can only query Tag by ID?

  const { tags } = await getAllTags();

  const tag = tags.find(({ slug }) => slug === tagSlug);

  return {
    tag,
  };
}

/**
 * _mapTagData
 */

function _mapTagData(data) {
  const tag = {
    ...data.node,
    logo: null,
  };

  if (tag.tag.logo?.sourceUrl) {
    tag.logo = {
      url: tag.tag.logo.sourceUrl,
    };
  }

  return tag;
}
