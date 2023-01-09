import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_COURSES } from 'data/courses';

const PLATFORMS = [
  {
    id: 'eggheadio',
    name: 'egghead.io',
    type: 'video',
  },
  {
    id: 'email',
    name: 'Free Email Newsletter',
    type: 'email',
  },
  {
    id: 'leveluptuts',
    name: 'Level Up Tutorials',
    type: 'video',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    type: 'video',
  },
];

/**
 * getAllCourses
 */

export async function getAllCourses(options) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_COURSES,
  });

  const courses = data?.data.courses.edges.map(({ node = {} }) => node);

  return {
    courses: Array.isArray(courses) && courses.map(mapCourseData),
  };
}

/**
 * getPlatformById
 */

export function getPlatformById(platformId) {
  return PLATFORMS.find(({ id }) => id === platformId);
}

/**
 * mapCourseData
 */

export function mapCourseData(course = {}) {
  const data = {
    ...course,
    ...course.course,
  };

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  delete data.course;

  return data;
}
