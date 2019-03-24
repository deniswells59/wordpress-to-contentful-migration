const axios = require('axios');

async function fetchWPInfo({ url }) {
  try {
    const wordpressData = await axios.get(url);
    const fieldsData = wordpressData.data.acf;

    const formattedFieldsData = Object.keys(fieldsData).reduce((acc, dataKey) => {
      if (dataKey) {
        const data = fieldsData[dataKey];
        acc[dataKey] = { 'en-US': data };
      }

      return acc;
    }, {});

    return formattedFieldsData;
  } catch (error) {
    console.log('ERR', error);
  }
}

module.exports = fetchWPInfo;
