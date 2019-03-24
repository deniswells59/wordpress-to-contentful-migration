const { assetInfo } = require('./dataInfo');

async function createAsset({ client, contentfulData: { title, contentType, fileName, upload } }) {
  const assetData = {
    fields: {
      title: {
        'en-US': title
      },
      file: {
        'en-US': {
          contentType,
          fileName,
          upload
        }
      }
    }
  };

  const { items } = await client.getAssets({
    'fields.title': title
  });

  const assetAlreadyExists = items.length > 0;
  if (assetAlreadyExists) {
    return items[0].sys.id;
  }

  const asset = await client.createAsset(assetData);
  return asset.sys.id;
}

async function publishAsset({ assetId, client }) {
  const asset = await client.getAsset(assetId);
  if (asset.isPublished()) return;

  await asset.processForAllLocales();

  const processedAsset = await client.getAsset(assetId);
  await processedAsset.publish();
}

async function createAndPublishAsset({ wordpressData, client }) {
  try {
    const assetIds = await Promise.all(
      Object.keys(assetInfo).map(async assetWPName => {
        if (wordpressData[assetWPName]) {
          const url = wordpressData[assetWPName]['en-US'];
          const info = assetInfo[assetWPName];

          const contentfulData = {
            ...info,
            upload: url
          };

          const assetId = await createAsset({ contentfulData, client });
          await publishAsset({ assetId, client });

          return { [assetWPName]: assetId };
        }
      })
    );

    return assetIds;
  } catch (error) {
    console.log('Error in createAndPublishAsset: ', error);
  }
}

module.exports = createAndPublishAsset;
