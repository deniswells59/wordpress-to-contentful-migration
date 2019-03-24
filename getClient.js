const contentful = require('contentful-management');

async function getClient() {
  try {
    const client = await contentful.createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_KEY
    });

    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_NAME);

    return environment;
  } catch (error) {
    console.log('Error in getClient: ', error);
  }
}

module.exports = getClient;
