const axios = require('axios');
const get = require('lodash.get');
const { wpDataPaths } = require('./dataInfo');

const isObject = val => {
  if (val === null) {
    return false;
  }
  return typeof val === 'function' || typeof val === 'object';
};

const mergeWPData = data =>
  wpDataPaths.reduce((acc, path) => {
    if (isObject(path)) {
      const key = Object.keys(path)[0];
      const pathToMap = path[key];

      return {
        ...acc,
        [key]: get(data, pathToMap)
      };
    }

    return {
      ...acc,
      ...get(data, path)
    };
  }, {});

async function fetchWPInfo({ url }) {
  try {
    const { data } = await axios.get(url);
    const fieldsData = mergeWPData(data);

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
