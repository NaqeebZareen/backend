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

const getActivityCount = async (city) => {
    let query = `select category ,count(*)::INT as activities
    from activity_service.activities
    where normalized_city = '${city}' AND start_date >= current_date
    group by category;`;
    try {
        const { rows } = await db.query(query);
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

module.exports = {
    homeData,
    getActivityCount
}