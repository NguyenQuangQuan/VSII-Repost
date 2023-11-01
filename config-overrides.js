const webpack = require('webpack');
const WorkBoxPlugin = require('workbox-webpack-plugin');
/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc } = require('customize-cra');

module.exports = function override(config) {
    config.resolve.fallback = {
        util: require.resolve('util')
    };

    // https://stackoverflow.com/questions/69135310/workaround-for-cache-size-limit-in-create-react-app-pwa-service-worker
    config.plugins.forEach((plugin) => {
        if (plugin instanceof WorkBoxPlugin.InjectManifest) {
            plugin.config.maximumFileSizeToCacheInBytes = 50 * 1024 * 1024;
        }
    });

    config.plugins = [...config.plugins, new webpack.ProvidePlugin({})];
    useBabelRc();

    return config;
};
