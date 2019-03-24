require('dotenv').config();

const { wpUrlSuffix } = require('./dataInfo');
const getClient = require('./getClient');
const fetchWPInfo = require('./fetchWPInfo');
const createAndPublishAsset = require('./createAndPublishAsset');
const createAndPublishEntry = require('./createAndPublishEntry');

const url = path => {
  return `${process.env.WORDPRESS_API_URL}${wpUrlSuffix}`;
};

async function init() {
  try {
    const client = await getClient();
    const wordpressData = await fetchWPInfo({ url: url() });

    if (process.env.MIGRATION_ENV === 'PREVIEW') {
      console.log(wordpressData);
      return;
    }

    const assetsById = await createAndPublishAsset({ wordpressData, client });
    const entry = await createAndPublishEntry({
      wordpressData,
      assetsById,
      client
    });

    console.log('Successful entry created: ', entry);
  } catch (error) {
    console.log('Error at index.js: ', error);
  }
}

init();
