const db = require('../db/db-connector')
const { repoHelper } = require('../../../utils')

const searchNewsByIdArray = async (IdArray,userId) => {
    let query = `SELECT * from newsservice.news_listing_with_array
    ('${repoHelper.convertArrayToDbArray(IdArray)}','${userId}');`
    console.log(query);
    // let filterDate=filterObject.date || new Date().toDateString();filterObject.date? filterObject.date:new Date().toDateString()
    try {
        const { rows } = await db.query(query);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const searchActivitiesByIdArray = async (IdArray,userId) => {
    let query = `SELECT * from activity_service.activity_listing_with_id_array
    ('${repoHelper.convertArrayToDbArray(IdArray)}','${userId}');`;
    console.log(query);
    // let filterDate=filterObject.date || new Date().toDateString();filterObject.date? filterObject.date:new Date().toDateString()
    try {
        const { rows } = await db.query(query);
        return (rows);
    } catch (error) {
        throw (error);
    }
}


module.exports = {
    searchNewsByIdArray,
    searchActivitiesByIdArray
}