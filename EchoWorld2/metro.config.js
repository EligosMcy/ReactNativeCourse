const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 解决Windows路径问题
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'node:sea': require.resolve('./src/utils/empty-module.js'),
};

module.exports = config;