const db = require('../db/db-connector')
const { repoHelper } = require('../../../utils')

const getTotalNews = async () => {
    let query = `SELECT count(*) as total_news from newsservice.news;`;
    try {
        const { rows } = await db.query(query);
        return (rows[0]);
    } catch (error) {
        throw (error);
    }
}

const getTodayNewsTotal = async () => {
    let query = `SELECT count(*) as news_added_today from newsservice.news where created_at >= CURRENT_DATE;`;
    try {
        const { rows } = await db.query(query);
        return (rows[0]);
    } catch (error) {
        throw (error);
    }
}

const getTotalActivities = async () => {
    let query = `SELECT count(*) as total_activities from activity_service.activities;`;
    try {
        const { rows } = await db.query(query);
        return (rows[0]);
    } catch (error) {
        throw (error);
    }
}

const getTodayActivitiesTotal = async () => {
    let query = `SELECT count(*) as activities_added_today from activity_service.activities where created_at >= CURRENT_DATE;`;
    try {
        const { rows } = await db.query(query);
        return (rows[0]);
    } catch (error) {
        throw (error);
    }
}

const getActiveActivitiesTotal = async () => {
    let query = `SELECT count(*) as active_activities from activity_service.activities where start_date >= CURRENT_DATE;`;
    try {
        const { rows } = await db.query(query);
        return (rows[0]);
    } catch (error) {
        throw (error);
    }
}


module.exports = {
    getTotalNews,
    getTodayNewsTotal,
    getTotalActivities,
    getTodayActivitiesTotal,
    getActiveActivitiesTotal
}