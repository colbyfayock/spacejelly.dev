const withPlugins = require('next-compose-plugins');
const images = require('next-images');
const siteConfig = require('./site.config');

module.exports = withPlugins([
  images
], {
  env: {
    ...siteConfig,
    NEXT_PUBLIC_siteName: siteConfig.siteName
  }
});