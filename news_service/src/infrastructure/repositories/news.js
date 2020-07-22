const db = require('../db/db-connector')
const { repoHelper } = require('../../../utils')


const searchNews = async (filterObject, userId, limit, offset) => {
    let query = `SELECT n.id::int, n.duplicate_title as title, n.sub_heading, LEFT (summary, 350) as body,
    n.publication_date, n.picture, n.source_name, n.source_link, n.share_link, n.city,n.is_bookmarked,
    nv.positive_votes,nv.negative_votes,
    uv.positive_voted ,uv.negative_voted
    FROM newsservice.news n
    join newsservice.news_votes nv
    on n.id =nv.news_id
    left join newsservice.user_votes uv
    on n.id =uv.news_id and uv.user_id= '${userId}'
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

const searchDetailedNews = async (newsId,userId, offset) => {
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

const upVoteNews = async (newsId) => {
    let query = `UPDATE newsservice.news_votes
    SET positive_votes=positive_votes+1
    WHERE news_id=$1 returning positive_votes,negative_votes,positive_percentage,negative_percentage;`
    let values = [newsId];
    try {
        const { rows } = await db.query(query, values);
        let updatedRecord = rows[0];
        updatedRecord.total_votes = updatedRecord.positive_votes + updatedRecord.negative_votes;
        updatedRecord.positive_percentage = (updatedRecord.positive_votes / updatedRecord.total_votes) * 100;
        updatedRecord.negative_percentage = (updatedRecord.negative_votes / updatedRecord.total_votes) * 100;
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const downVoteNews = async (newsId) => {
    let query = `UPDATE newsservice.news_votes
    SET negative_votes=negative_votes+1
    WHERE news_id=$1 returning positive_votes,negative_votes,positive_percentage,negative_percentage;`
    let values = [newsId];
    try {
        const { rows } = await db.query(query, values);
        let updatedRecord = rows[0];
        updatedRecord.total_votes = updatedRecord.positive_votes + updatedRecord.negative_votes;
        updatedRecord.positive_percentage = (updatedRecord.positive_votes / updatedRecord.total_votes) * 100;
        updatedRecord.negative_percentage = (updatedRecord.negative_votes / updatedRecord.total_votes) * 100;
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const removeUpVoteFromNews = async (newsId, userId) => {
    let query = `UPDATE newsservice.news_votes
    SET positive_votes=positive_votes-1
    WHERE news_id=$1 returning positive_votes,negative_votes,positive_percentage,negative_percentage;`
    let values = [newsId];
    let queryToDeleteUserVote = `DELETE FROM newsservice.user_votes WHERE news_id=$1 AND user_id=$2`;
    let deleteParameters = [newsId, userId]
    try {
        db.query(queryToDeleteUserVote, deleteParameters);
        const { rows } = await db.query(query, values);
        let updatedRecord = rows[0];
        updatedRecord.total_votes = updatedRecord.positive_votes + updatedRecord.negative_votes;
        updatedRecord.positive_percentage = (updatedRecord.positive_votes / updatedRecord.total_votes) * 100;
        updatedRecord.negative_percentage = (updatedRecord.negative_votes / updatedRecord.total_votes) * 100;
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const removeDownVoteFromNews = async (newsId, userId) => {
    let query = `UPDATE newsservice.news_votes
    SET negative_votes=negative_votes-1
    WHERE news_id=$1 returning positive_votes,negative_votes,positive_percentage,negative_percentage;`
    let values = [newsId];
    let queryToDeleteUserVote = `DELETE FROM newsservice.user_votes WHERE news_id=$1 AND user_id=$2`;
    let deleteParameters = [newsId, userId]
    try {
        db.query(queryToDeleteUserVote, deleteParameters);
        const { rows } = await db.query(query, values);
        let updatedRecord = rows[0];
        updatedRecord.total_votes = updatedRecord.positive_votes + updatedRecord.negative_votes;
        updatedRecord.positive_percentage = (updatedRecord.positive_votes / updatedRecord.total_votes) * 100;
        updatedRecord.negative_percentage = (updatedRecord.negative_votes / updatedRecord.total_votes) * 100;
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const addUserVote = async (newsId, userId, positive_voted, negative_voted) => {
    let query = `INSERT INTO newsservice.user_votes
    (news_id, user_id,positive_voted,negative_voted)
    VALUES($1,$2,$3,$4);`
    let values = [newsId, userId, positive_voted, negative_voted];
    try {
        return await db.query(query, values);
    } catch (error) {
        if (error.routine === '_bt_check_unique')
            throw new Error('User has Already voted')
        throw (error);
    }
}

const getUserVote = async (newsId, userId) => {
    let query = `SELECT news_id, user_id, positive_voted, negative_voted
    FROM newsservice.user_votes  where news_id = $1 AND user_id=$2;`
    let values = [newsId, userId];
    try {
        let { rows } = await db.query(query, values);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

const updateUserVote = async (newsId, userId, positive_voted, negative_voted) => {
    let query = `UPDATE newsservice.user_votes
    SET positive_voted=$3, negative_voted=$4, updated_at=now()
    WHERE news_id=$1 and user_id = $2;`
    let values = [newsId, userId, positive_voted, negative_voted];
    let queryToUpdateVotes = `UPDATE newsservice.news_votes
    SET positive_votes=case when ${negative_voted} then positive_votes-1 else positive_votes end,
    negative_votes =case when ${positive_voted} then negative_votes-1 else negative_votes end
    WHERE news_id=130955 returning positive_votes,negative_votes,positive_percentage,negative_percentage;`

    try {
        db.query(queryToUpdateVotes);
        let { rows } = await db.query(query, values);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    searchNews,
    searchDetailedNews,
    searchNewsByIdArray,
    upVoteNews,
    downVoteNews,
    removeUpVoteFromNews,
    removeDownVoteFromNews,
    addUserVote,
    getUserVote,
    updateUserVote
}