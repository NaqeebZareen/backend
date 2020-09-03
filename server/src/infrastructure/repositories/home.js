const db = require('../db/db-connector')

const homeData = async () => {
    let cityQuery = `SELECT id, "name", picture FROM managementpanel.cities WHERE is_active=true;`;
    let interestQuery = `SELECT id, interest_name, picture FROM managementpanel.interests;`;
    try {
        const { rows } = await db.query(cityQuery);
        let data = { cities: rows };
        let interestsData = await db.query(interestQuery);
        data.interests = interestsData.rows;
        return data;
    } catch (error) {
        throw (error);
    }
}

const getActivityCountByDate = async (arr) => {
    let query = `SELECT * from activity_service.activity_count_by_date($1,$2);`;
    let values = [arr.city, arr.date]
    try {
        const { rows } = await db.query(query, values);
        let data = { 'All': 0 };
        rows.map(row => {
            data.All = data.All + parseInt(row.activities);
            data[row.category] = row.activities;
        });
        return data;
    } catch (error) {
        throw (error);
    }
}

const getActivityCountByRange = async (arr) => {
    console.log(arr);
    let query = `SELECT * from activity_service.activity_count_by_range($1,$2,$3);`;
    let values = [arr.city, arr.dateFrom, arr.dateTo];
    try {
        const { rows } = await db.query(query, values);
        let data = { 'All': 0 };
        rows.map(row => {
            data.All = data.All + parseInt(row.activities);
            data[row.category] = row.activities;
        });
        return data;
    } catch (error) {
        throw (error);
    }
}

const getlatestRelease = async (plateform) => {
    let query = `select release_version from managementpanel.releases where release_platform = '${plateform}' 
    order by release_version desc limit 1;`;
    try {
        const { rows } = await db.query(query);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

const getUrlMetadata = async (url) => {
    let query = `SELECT url, meta_title, meta_description, content_box
    FROM managementpanel.seo where url='${url}'`;
    try {
        const { rows } = await db.query(query);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    homeData,
    getActivityCountByDate,
    getActivityCountByRange,
    getlatestRelease,
    getUrlMetadata
}