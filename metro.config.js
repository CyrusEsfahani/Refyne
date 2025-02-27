const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  // Ensure that .ttf files are included in assetExts
  if (!config.resolver.assetExts.includes('ttf')) {
    config.resolver.assetExts.push('ttf');
  }
  return config;
})();
