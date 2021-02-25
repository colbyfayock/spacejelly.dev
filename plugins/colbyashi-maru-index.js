const path = require('path');
const { getAllColbyashiMaruEpisodes, generateIndexColbyashiMaru } = require('./util');

const WebpackPluginCompiler = require('./plugin-compiler');

module.exports = function indexColbyashiMaru(nextConfig = {}) {
  const { env, outputDirectory, outputName, verbose = false } = nextConfig;

  const plugin = {
    name: 'SearchIndex',
    outputDirectory: outputDirectory || './public',
    outputName: outputName || 'colbyashi-maru.json',
    getData: getAllColbyashiMaruEpisodes,
    generate: generateIndexColbyashiMaru,
  };

  const { WORDPRESS_GRAPHQL_ENDPOINT, WORDPRESS_HOST } = env;

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (config.watchOptions) {
        config.watchOptions.ignored.push(path.join('**', plugin.outputDirectory, plugin.outputName));
      }

      config.plugins.push(
        new WebpackPluginCompiler({
          host: WORDPRESS_HOST,
          url: WORDPRESS_GRAPHQL_ENDPOINT,
          plugin,
          verbose,
        })
      );

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
