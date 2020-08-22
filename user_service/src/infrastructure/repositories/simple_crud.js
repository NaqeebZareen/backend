const MongoClient = require('mongodb').MongoClient;
const config = require('../../../config');
const log = require('../../logger');

let db = undefined;
let client = {
  isConnected: () => { return false; }
};

async function connentToServer() {
  client = await MongoClient.connect(config.mongoConnection.uri, config.mongoOptions);
  db = client.db(config.mongoConnection.dbName);
  log.info('connected to DATABASE');
};

module.exports = (collection) => {
  const create = async modelObj => {
    try {
      let createdObj = {};
      if (!client.isConnected())
        await connentToServer();
      createdObj = await db.collection(collection).insertOne(modelObj);
      if (createdObj.insertedCount > 0)
        return createdObj.ops[0];
      else return null;
    } catch (error) {
      console.log(error);
    }
  }

  const find = async (condition, limit, skip, sortFeild, fieldsArray) => {
    let sort = { [sortFeild]: 1 }
    let projection = { _id: 0 }
    condition = condition || {};
    if (fieldsArray)
      fieldsArray.map(e => {
        projection[e] = 1
      });
    console.log(projection);
    if (!client.isConnected())
      await connentToServer();
    let data = await db.collection(collection).find(condition, { sort, projection }).skip(skip).limit(limit).toArray();

    return data;
  }

  const findOne = async (condition, sortField, fieldsArray) => {
    console.log(`inside repository layer=>>>>`, condition, sortField, fieldsArray)
    let sort = { [sortField]: 1 }
    let projection = { _id: 0 }
    if (fieldsArray)
      fieldsArray.map(e => {
        projection[e] = 1
      });
    if (!client.isConnected()) { console.log('hello db is not connected'); await connentToServer(); }
    console.log('the request has been send to database');
    return await db.collection(collection).findOne(condition, { sort, projection });

  }

  const findMaximum = async (fieldForMax, condition) => {
    let maxField = { [fieldForMax]: -1 };
    if (!client.isConnected())
      await connentToServer();
    let data = await db.collection(collection).find(condition, { sort: maxField, limit: 1 });

    return data;
  }

  const update = async (condition, arr) => {
    if (!client.isConnected())
      await connentToServer();
    let data = await db.collection(collection).updateOne(condition, { $set: arr }, { upsert: true });
    if (data.modifiedCount > 0)
      return { updated: true, updatedRecords: data.modifiedCount };
    else return { updated: false, updatedRecords: data.modifiedCount };
  }

  const getTotal = async () => {
    let data = await dbConnector.getDb().collection(collection).countDocuments();
    return data;
  }

  const removeOne = async (condition) => {
    if (!client.isConnected())
      await connentToServer();
    let data = await db.collection(collection).deleteOne(condition, { justOne: true });
    return data.n > 0 ? { isDeleted: true } : { isDeleted: false };
  }

  const removeAll = async (condition) => {
    if (!client.isConnected())
      await connentToServer();
    let data = await db.collection(collection).deleteMany(condition, { justOne: false });
    return data.n > 0 ? { isDeleted: true, deletedRecords: data.n } : { isDeleted: false };
  }

  return {
    create,
    findOne,
    find,
    update,
    findMaximum,
    getTotal,
    removeOne,
    removeAll
  }
}