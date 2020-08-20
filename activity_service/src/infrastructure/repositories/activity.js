const db = require('../db/db-connector')
const { repoHelper } = require('../../../utils')

const activityListing = async (filterObject, userId, limit, offset) => {
    let query = `select * from activity_service.activity_listing($1,$2,$3,$4,$5);`;
    const values = [filterObject.city, userId,
    repoHelper.convertArrayToDbArray(filterObject.categories),
        limit, offset]
    try {
        const { rows } = await db.query(query, values);
        return rows;
    } catch (error) {
        throw (error);
    }
}

const searchActivitiesByDate = async (filterObject, userId, limit, offset) => {
    let query = `select * from activity_service.activity_search($1,$2,$3,$4,$5,$6,$7);`
    let values = [filterObject.text, filterObject.city, filterObject.date,
    repoHelper.convertArrayToDbArray(filterObject.categories),
        userId, limit, offset
    ]
    console.log(query);
    try {
        const { rows } = await db.query(query, values);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const searchActivitiesByDateRange = async (filterObject, userId, limit, offset) => {
    console.log(repoHelper.convertArrayToDbArray(filterObject.categories), filterObject);
    let query = `select * from activity_service.activity_search_by_date($1,$2,$3,$4,$5,$6,$7,$8);`
    let values = [filterObject.text, filterObject.city, filterObject.dateFrom, filterObject.dateTo,
    repoHelper.convertArrayToDbArray(filterObject.categories),
        userId, limit, offset]
    console.log(query);
    try {
        const { rows } = await db.query(query, values);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const getDetailedActivity = async (activityId, userId) => {
    let detailQuery = `select a.title, a.summary,
    a.picture, a.category, a.city,
    a.source_name, a.source_link, a.share_link,
    a.start_date, a.start_time, a.end_date, a.end_time, a.description ,sa.saved 
    from activity_service.activities a 
    left join activity_service.saved_activities sa on a.id=sa.activity_id
    AND sa.user_id= '${userId}'
    where a.id=${activityId};`
    let similarQuery = `select a.title, a.summary,
    a.picture, a.category, a.city,
    a.source_name, a.source_link, a.share_link,
    a.start_date, a.start_time, a.end_date, a.end_time, a.description ,sa.saved 
    from activity_service.activities a 
    left join activity_service.saved_activities sa on a.id=sa.activity_id
    AND sa.user_id= '${userId}' order by a.start_date limit 8`;

    try {
        const { rows } = await db.query(detailQuery);
        let activity_detail = rows[0];
        const similar = await db.query(similarQuery);
        return { activity_detail, similar_activities: similar.rows };
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    activityListing,
    searchActivitiesByDate,
    searchActivitiesByDateRange,
    getDetailedActivity
}