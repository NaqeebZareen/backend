const db = require('../db/db-connector')
const { repoHelper } = require('../../../utils')


const searchNews = async (filterObject,limit,offset) => {
    console.log(filterObject, 'data from db=>', repoHelper.convertArrayToString(filterObject.cities));

    let query = `SELECT n.id::int, n.duplicate_title as title, n.sub_heading, n.publication_date, n.picture, n.source_name, n.city,nv.positive_votes,nv.negative_votes 
    FROM newsservice.news n
    join newsservice.news_votes nv 
    on n.id =nv.news_id 
    where n.city in (${repoHelper.convertArrayToString(filterObject.cities)}) 
    and n.publication_date=Date('${filterObject.publication_date}')
        and n.status='Approved'
        AND (n.normalized_title LIKE '%${filterObject.text}%'
        OR n.sub_heading LIKE '%${filterObject.text}%' 
        OR n.source_name like '%${filterObject.text}%') LIMIT ${limit} OFFSET ${offset}`
    console.log(query);
    // let filterDate=filterObject.date || new Date().toDateString();filterObject.date? filterObject.date:new Date().toDateString()

    const values = [filterObject.date];
    try {
        const { rows } = await db.query(query);
        rows.map(obj => {
            obj.total_votes = obj.positive_votes + obj.negative_votes;
            obj.positive_percentage = (obj.positive_votes / obj.total_votes) * 100;
            obj.negative_percentage = (obj.negative_votes / obj.total_votes) * 100;
        })
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const searchDetailedNews = async (newsId, offset) => {
    let query = `SELECT n.id::int, n.sub_heading, n.body, n.publication_date, n.source_link, n.picture, n.duplicate_title as title , n.source_name, n.city,nv.positive_votes,nv.negative_votes 
    FROM newsservice.news as n
    join newsservice.news_votes nv 
    on n.id =nv.news_id
    where n.id=$1;`
    const values = [newsId];
    try {
        const { rows } = await db.query(query, values);
        let newsDetail = rows[0];
        console.log('News Details=>>>>>>', newsDetail);
        let similarNewsQuery = `SELECT n.id, n.duplicate_title as title, n.sub_heading, n.publication_date, n.picture, n.source_name, n.city,nv.positive_votes,nv.negative_votes 
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
        })
        console.log('News similar=>>>>>>', newsDetail);
        return { news_detail: newsDetail, similar_news: similarNews.rows }
        // return (rows[0]);
    } catch (error) {
        throw (error);
    }
}

const searchNewsByIdArray = async IdArray => {
    let query = `SELECT n.id::int, n.duplicate_title as title, n.sub_heading, n.publication_date, n.picture, n.source_name, n.city,nv.positive_votes,nv.negative_votes 
    FROM newsservice.news n
    join newsservice.news_votes nv 
    on n.id =nv.news_id 
    where n.id in (${repoHelper.convertArrayToString(IdArray)});`
    console.log(query);
    // let filterDate=filterObject.date || new Date().toDateString();filterObject.date? filterObject.date:new Date().toDateString()
    try {
        const { rows } = await db.query(query);
        rows.map(obj => {
            obj.total_votes = obj.positive_votes + obj.negative_votes;
            obj.positive_percentage = (obj.positive_votes / obj.total_votes) * 100;
            obj.negative_percentage = (obj.negative_votes / obj.total_votes) * 100;
        })
        return (rows);
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    searchNews,
    searchDetailedNews,
    searchNewsByIdArray
}