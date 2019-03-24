require('dotenv').config();

const { wpUrlSuffix } = require('./utils/dataInfo');
const getClient = require('./utils/getClient');
const fetchWPInfo = require('./utils/fetchWPInfo');
const createAndPublishAsset = require('./utils/createAndPublishAsset');
const createAndPublishEntry = require('./utils/createAndPublishEntry');

const url = () => {
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
    // const entry = await createAndPublishEntry({
    //   wordpressData,
    //   assetsById,
    //   client
    // });

    // console.log('Successful entry created: ', entry);
  } catch (error) {
    console.log('Error at index.js: ', error);
  }
}

init();
