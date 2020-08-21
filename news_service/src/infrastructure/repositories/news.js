const db = require('../db/db-connector')
const { repoHelper } = require('../../../utils')


const searchNews = async (filterObject, userId, limit, offset) => {
    let query = `SELECT * from newsservice.news_listing($1,$2,$3,$4,$5,$6);`
    console.log(query, filterObject);
    const values = [filterObject.text, filterObject.city, filterObject.publication_date,
        userId, limit, offset];
    try {
        const { rows } = await db.query(query, values);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const searchDetailedNews = async (newsId, userId, offset) => {
    let query = `SELECT * from newsservice.search_by_id(${newsId},'${userId}');`
    console.log(query);
    try {
        const { rows } = await db.query(query);
        let newsDetail = rows[0];
        console.log('News Details=>>>>>>', newsDetail);
        let similarNewsQuery = ` SELECT n.id, n.title, n.sub_heading,n.summary, 
        n.publication_date, n.picture, n.source_name, n.city,
        nv.positive_votes,nv.negative_votes,nv.unsure_votes,nv.total_votes,
        nv.positive_percentage,nv.negative_percentage,nv.unsure_percentage, sn.saved
               FROM newsservice.news n
               join newsservice.news_votes nv 
               on n.id =nv.news_id 
               left join newsservice.saved_news sn
               on n.id =sn.news_id and sn.user_id ='${userId}'
               where n.status='Approved' limit 8 offset ${offset};`
        similarNews = await db.query(similarNewsQuery);
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
    WHERE news_id=$1 
    returning positive_votes,negative_votes,unsure_votes,total_votes,positive_percentage,negative_percentage,unsure_percentage;`
    let values = [newsId];
    try {
        const { rows } = await db.query(query, values);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const downVoteNews = async (newsId) => {
    let query = `UPDATE newsservice.news_votes
    SET negative_votes=negative_votes+1
    WHERE news_id=$1 
    returning positive_votes,negative_votes,unsure_votes,total_votes,positive_percentage,negative_percentage,unsure_percentage;`
    let values = [newsId];
    try {
        const { rows } = await db.query(query, values);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const removeUpVoteFromNews = async (newsId, userId) => {
    let query = `UPDATE newsservice.news_votes
    SET positive_votes=positive_votes-1
    WHERE news_id=$1 
    returning positive_votes,negative_votes,unsure_votes,total_votes,positive_percentage,negative_percentage,unsure_percentage;`
    let values = [newsId];
    let queryToDeleteUserVote = `DELETE FROM newsservice.user_votes WHERE news_id=$1 AND user_id=$2`;
    let deleteParameters = [newsId, userId]
    try {
        db.query(queryToDeleteUserVote, deleteParameters);
        const { rows } = await db.query(query, values);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const removeDownVoteFromNews = async (newsId, userId) => {
    let query = `UPDATE newsservice.news_votes
    SET negative_votes=negative_votes-1
    WHERE news_id=$1 
    returning positive_votes,negative_votes,unsure_votes,total_votes,positive_percentage,negative_percentage,unsure_percentage;`
    let values = [newsId];
    let queryToDeleteUserVote = `DELETE FROM newsservice.user_votes WHERE news_id=$1 AND user_id=$2`;
    let deleteParameters = [newsId, userId]
    try {
        db.query(queryToDeleteUserVote, deleteParameters);
        const { rows } = await db.query(query, values);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const addUserVote = async (newsId, userId, positive_voted, negative_voted, unsure) => {
    let query = `INSERT INTO newsservice.user_votes
    (news_id, user_id,positive_voted,negative_voted,unsure)
    VALUES($1,$2,$3,$4,$5);`
    let values = [newsId, userId, positive_voted, negative_voted, unsure];
    try {
        return await db.query(query, values);
    } catch (error) {
        if (error.routine === '_bt_check_unique')
            throw new Error('User has Already voted')
        throw (error);
    }
}

const getUserVote = async (newsId, userId) => {
    let query = `SELECT news_id, user_id, positive_voted, negative_voted,unsure
    FROM newsservice.user_votes  where news_id = $1 AND user_id=$2;`
    let values = [newsId, userId];
    try {
        let { rows } = await db.query(query, values);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

const updateUserVote = async (newsId, userId, positive_voted, negative_voted, unsure) => {
    let query = `UPDATE newsservice.user_votes
    SET positive_voted=$3, negative_voted=$4, unsure=$5, updated_at=now()
    WHERE news_id=$1 and user_id = $2;`
    let values = [newsId, userId, positive_voted, negative_voted, unsure];

    try {
        let { rows } = await db.query(query, values);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

const updateVotes = async (newsId, removePositive, removeNegative, removeUnsure) => {

    let queryToUpdateVotes = `UPDATE newsservice.news_votes
    SET positive_votes=case when ${removePositive} then positive_votes-1 else positive_votes end,
    unsure_votes=case when ${removeUnsure} then unsure_votes-1 else unsure_votes end,
    negative_votes =case when ${removeNegative} then negative_votes-1 else negative_votes end
    WHERE news_id=${newsId}
    returning positive_votes,negative_votes,unsure_votes,total_votes,positive_percentage,negative_percentage,unsure_percentage;`
    try {
        let { rows } = await db.query(queryToUpdateVotes);
        return rows;
    } catch (error) {
        throw (error);
    }
}

const unsureVoteNews = async (newsId) => {
    let query = `UPDATE newsservice.news_votes
    SET unsure_votes=unsure_votes+1
    WHERE news_id=$1 
    returning positive_votes,negative_votes,unsure_votes,total_votes,positive_percentage,negative_percentage,unsure_percentage;`
    let values = [newsId];
    try {
        const { rows } = await db.query(query, values);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const removeUnsureVoteFromNews = async (newsId, userId) => {
    let query = `UPDATE newsservice.news_votes
    SET unsure_votes=unsure_votes-1
    WHERE news_id=$1 
    returning positive_votes,negative_votes,unsure_votes,total_votes,positive_percentage,negative_percentage,unsure_percentage;`
    let values = [newsId];
    let queryToDeleteUserVote = `DELETE FROM newsservice.user_votes WHERE news_id=$1 AND user_id=$2`;
    let deleteParameters = [newsId, userId]
    try {
        db.query(queryToDeleteUserVote, deleteParameters);
        const { rows } = await db.query(query, values);
        return (rows);
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
    updateUserVote,
    unsureVoteNews,
    removeUnsureVoteFromNews,
    updateVotes
}