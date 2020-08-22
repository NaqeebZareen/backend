const db = require('../db/db-connector')

const saveNews = async (newsId, userId) => {
    let query = `INSERT INTO newsservice.saved_news
    (news_id, user_id) VALUES(${newsId}, '${userId}');`
    console.log(query);
    try {
        const { rows } = await db.query(query);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const saveActivity = async (activityId, userId) => {
    let query = `INSERT INTO activity_service.saved_activities
    (activity_id, user_id) VALUES(${activityId}, '${userId}');`;
    console.log(query);
    try {
        const { rows } = await db.query(query);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const removeActivity = async (activityId, userId) => {
    let query = `DELETE FROM activity_service.saved_activities
    WHERE user_id='${userId}' AND activity_id=${activityId};`
    console.log(query);
    try {
        const { rows } = await db.query(query);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const removeNews = async (newsId, userId) => {
    let query = `DELETE FROM newsservice.saved_news
    WHERE user_id='${userId}' AND news_id=${newsId};`
    console.log(query);
    try {
        const { rows } = await db.query(query);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const newsList = async (userId) => {
    let query = `SELECT n.id, n.title , n.sub_heading, n.summary, 
    n.publication_date, n.picture, n.source_name, n.source_link,
    n.share_link, n.city,sn.saved,
    nv.positive_votes,nv.negative_votes,nv.unsure_votes,nv.total_votes , 
    nv.positive_percentage::float,nv.negative_percentage::float,nv.unsure_percentage::float, 
    uv.positive_voted ,uv.negative_voted,uv.unsure
    FROM newsservice.news n
    join newsservice.news_votes nv
    on n.id =nv.news_id
    inner join newsservice.saved_news sn 
    on n.id =sn.news_id and sn.user_id = '${userId}'
    left join newsservice.user_votes uv
    on n.id =uv.news_id and uv.user_id= '${userId}';`
    console.log(query);
    try {
        const { rows } = await db.query(query);
        console.log(rows);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const ativityList = async (userId) => {
    let query = `select a.id, a.title, a.summary,
    a.picture, a.category, a.city,
    a.source_name, a.source_link, a.share_link,
    a.start_date, a.start_time, a.end_date, a.end_time,sa.saved 
    from activity_service.activities a 
    join activity_service.saved_activities sa on a.id=sa.activity_id
    AND sa.user_id='${userId}';`
    console.log(query);
    try {
        const { rows } = await db.query(query);
        return (rows);
    } catch (error) {
        throw (error);
    }
}


module.exports = {
    saveActivity,
    removeActivity,
    ativityList,
    newsList,
    removeNews,
    saveNews
}