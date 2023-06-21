const { withPlausibleProxy } = require('next-plausible');

const indexSearch = require('./plugins/search-index');
const feed = require('./plugins/feed');
const sitemap = require('./plugins/sitemap');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },

  env: {
    POSTS_PRERENDER_COUNT: 5,

    WORDPRESS_HOST: process.env.WORDPRESS_HOST,
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
  },
};

module.exports = () => {
  const plugins = [withPlausibleProxy(), indexSearch, feed, sitemap];
  return plugins.reduce((acc, plugin) => plugin(acc), nextConfig);
};
