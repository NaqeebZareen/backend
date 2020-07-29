const Pool = require('pg').Pool

const databaseOptions = {
    user:'postgres',
    host:'youcav-db.cnfabpkcjfhv.us-east-1.rds.amazonaws.com',
    database:'youcan',
    password:'Qwerty12'
    // max: 20,
    // idleTimeoutMillis: 30000,
    // connectionTimeoutMillis: 2000
}

const pool = new Pool(databaseOptions);

pool.on('connect',()=>console.log('Database Connection Established'));

pool.on('error',()=>console.error('error while connecting to User service db'));

module.exports = {
  /**
   * DB Query
   * @param {string} queryText
   * @param {Array} params
   * @returns {object} object 
   */
  query(queryText, params=null) {
    return new Promise((resolve, reject) => {
      pool.query(queryText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }  
}