const db = require('../db/db-connector')
const { repoHelper } = require('../../../utils')

const activityListing = async (city, userId, limit, offset) => {
    let query = `select * from activity_service.activity_listing('${city}','${userId}',${limit},${offset});`;
    try {
        const { rows } = await db.query(query);
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

const searchDetailedNews = async (newsId, userId, offset) => {
    let query = `SELECT n.id::int, n.sub_heading, n.body, n.publication_date, n.source_link, n.picture,
    n.duplicate_title as title , n.source_name,n.share_link, n.city,n.is_bookmarked,
    nv.positive_votes,nv.negative_votes,
    uv.positive_voted ,uv.negative_voted 
    FROM newsservice.news as n
    join newsservice.news_votes nv 
    on n.id =nv.news_id
    left join newsservice.user_votes uv
    on n.id =uv.news_id and uv.user_id= '${userId}'
    where n.id=$1;`
    const values = [newsId];
    try {
        const { rows } = await db.query(query, values);
        let newsDetail = rows[0];
        console.log('News Details=>>>>>>', newsDetail);
        let similarNewsQuery = `SELECT n.id, n.duplicate_title as title, n.sub_heading, n.publication_date, n.picture, n.source_name, n.city,nv.positive_votes,nv.negative_votes,n.is_bookmarked 
        FROM newsservice.news n
        join newsservice.news_votes nv 
        on n.id =nv.news_id 
        where n.status='Approved' limit 8 offset ${offset};`
        similarNews = await db.query(similarNewsQuery);
        newsDetail.total_votes = newsDetail.positive_votes + newsDetail.negative_votes;
        newsDetail.positive_percentage = (newsDetail.positive_votes / newsDetail.total_votes) * 100;
        newsDetail.negative_percentage = (newsDetail.negative_votes / newsDetail.total_votes) * 100;
        similarNews.rows.map(obj => {
            obj.total_votes = obj.positive_votes + obj.negative_votes;
            obj.positive_percentage = (obj.positive_votes / obj.total_votes) * 100;
            obj.negative_percentage = (obj.negative_votes / obj.total_votes) * 100;
        });
        return { news_detail: newsDetail, similar_news: similarNews.rows }
        // return (rows[0]);
    } catch (error) {
        throw (error);
    }
}

const searchActivitiesByDateRange = async (filterObject, userId, limit, offset) => {
    console.log(repoHelper.convertArrayToDbArray(filterObject.categories),filterObject);
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

const getDetailedActivity = async (activityId,userId) => {
    let detailQuery = `select a.title, a.summary,
    a.picture, a.category, a.city,
    a.source_name, a.source_link, a.share_link,
    a.start_date, a.start_time, a.end_date, a.end_time, a.description ,sa.saved 
    from activity_service.activities a 
    left join activity_service.saved_activities sa on a.id=sa.activity_id
    AND sa.user_id= '${userId}'
    where a.id=${activityId} and
    a.status = 'Approved';`
        
    try {
        const { rows } = await db.query(detailQuery);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    activityListing,
    searchActivitiesByDate,
    searchDetailedNews,
    searchActivitiesByDateRange,
    getDetailedActivity
}