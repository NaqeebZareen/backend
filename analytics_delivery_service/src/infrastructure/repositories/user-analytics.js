const MongoClient = require('mongodb').MongoClient;
const config = require('../../../config');

let db = undefined;
let client = {
  isConnected: () => { return false; }
};

async function connentToServer() {
  client = await MongoClient.connect(config.mongoConnection.uri, config.mongoOptions);
  db = client.db(config.mongoConnection.dbName);
  console.log('connected to DATABASE');
};

module.exports = (collection) => {

  const totalUsers = async () => {
    if (!client.isConnected())
      await connentToServer();
    let data = await db.collection(collection).find().count();
    return data;
  }

  const usersAddedToday = async () => {
    if (!client.isConnected())
      await connentToServer();
    let startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    let data = await db.collection(collection).find({
      'createdAt': {
        '$gte': startOfToday
      }
    }).count();
    return data;
  }

  return {
    totalUsers,
    usersAddedToday
  }
}