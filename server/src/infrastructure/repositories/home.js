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

module.exports = {
    homeData
}