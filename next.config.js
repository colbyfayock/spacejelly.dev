const withPlugins = require('next-compose-plugins');
const images = require('next-images');

const siteConfig = {
  siteName: 'My Product',
  gaPropertyId: 'XX-123456789-1'
};

module.exports = withPlugins([
  images
], {
  env: {
    ...siteConfig,
    NEXT_PUBLIC_siteName: 'My Product'
  }
});