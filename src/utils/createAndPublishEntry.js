const { contentModel } = require('./dataInfo');

const formatAssetData = data =>
  data.reduce((acc, asset) => {
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
  const formattedAssetData = formatAssetData(assetsById);
  const contentfulData = {
    ...wordpressData,
    ...formattedAssetData
  };

  const entry = await client.createEntry(contentModel, {
    fields: contentfulData
  });

  return entry;
}

module.exports = createAndPublishEntry;
