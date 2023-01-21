const indexSearch = require('./plugins/search-index');
// const indexColbyashiMaru = require('./plugins/colbyashi-maru-index');
const feed = require('./plugins/feed');
const sitemap = require('./plugins/sitemap');
// const socialImages = require('./plugins/socialImages'); TODO: failing to run on Netlify

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,

  env: {
    POSTS_PRERENDER_COUNT: 5,

    WORDPRESS_HOST: process.env.WORDPRESS_HOST,
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
  },
};

module.exports = () => {
  const plugins = [indexSearch, feed, sitemap];
  return plugins.reduce((acc, plugin) => plugin(acc), nextConfig);
};
