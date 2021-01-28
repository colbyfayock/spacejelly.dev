import { getApolloClient } from 'lib/apollo-client';
import { setDatetimeTimezone } from 'lib/datetime';

import { QUERY_ALL_CM_EPISODES } from 'data/colbyashi-maru';

/**
 * getAllCmEpisodes
 */

export async function getAllCmEpisodes(options) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_CM_EPISODES,
  });

  const cmEpisodes = data?.data.cmEpisodes.edges.map(({ node = {} }) => node);

  return {
    episodes: Array.isArray(cmEpisodes) && cmEpisodes.map(mapEpisodeData),
  };
}

/**
 * mapEpisodeData
 */

export function mapEpisodeData(episode = {}) {
  const data = {
    ...episode,
    ...episode.episode,
  };

  data.date = setDatetimeTimezone(data.date, 'America/New_York').toISOString();

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  return data;
}
