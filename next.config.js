const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  env: {
    POSTS_PRERENDER_COUNT: "5",

    WORDPRESS_HOST: process.env.WORDPRESS_HOST,
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
  },
};

module.exports = () => {
  const plugins = [withPlausibleProxy()];
  return plugins.reduce((acc, plugin) => plugin(acc), nextConfig);
};
