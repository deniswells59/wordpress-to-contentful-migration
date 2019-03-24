const { contentModel, assetInfo } = require('./dataInfo');

const formatWPData = data => {
  Object.keys(assetInfo).forEach(key => {
    delete data[key];
  });

  return data;
};

const formatAssetData = data =>
  data.reduce((acc, asset) => {
    if (!asset) return acc;
    const contentfulInputName = Object.keys(asset)[0];
    const contentfuleAssetId = asset[contentfulInputName];
    return {
      ...acc,
      [contentfulInputName]: {
        'en-US': {
          sys: {
            id: contentfuleAssetId,
            linkType: 'Asset',
            type: 'Link'
          }
        }
      }
    };
  }, {});

async function createAndPublishEntry({ wordpressData, assetsById, client }) {
  const formattedWPData = formatWPData(wordpressData);
  const formattedAssetData = formatAssetData(assetsById);

  const contentfulData = {
    ...formattedWPData,
    ...formattedAssetData
  };

  const entry = await client.createEntry(contentModel, {
    fields: contentfulData
  });

  return entry;
}

module.exports = createAndPublishEntry;
