const db = require('../db/db-connector')

const getAllSubscribersEamils = async () => {
    let query = `select json_agg(email) as subscribers from newsletterservice.subscribers;`;
    try {
        const { rows } = await db.query(query);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

const getCityBaseSubscribersEamils = async (city) => {
    let query = `select json_agg(email) as subscribers from newsletterservice.subscribers 
        where city =$1;`;
    const values = [city];
    try {
        const { rows } = await db.query(query, values);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

const addnewScheduler = async (arr) => {
    let query = `INSERT INTO newsletterservice.schedules
    (city, scheduled_date, scheduled_time, html)
    VALUES($1, $2, $3, $4);`;
    const values = [arr.city, arr.scheduled_date, arr.scheduled_time, arr.newsletter_html];
    try {
        const { rows } = await db.query(query, values);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

const getNewsletterDetails = async (newsletterId) => {
    let query = `SELECT id, city, scheduled_date, scheduled_time, html
    FROM newsletterservice.schedules where id =$1;
    `;
    const values = [newsletterId];
    try {
        const { rows } = await db.query(query, values);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

const updateScheduleStatus = async (newsletterId) => {
    let query = `Update newsletterservice.schedules
    SET is_completed=true where id =$1;`;
    const values = [newsletterId];
    try {
        const rows = await db.query(query, values);
        return rows;
    } catch (error) {
        throw (error);
    }
}


module.exports = {
    getAllSubscribersEamils,
    getCityBaseSubscribersEamils,
    addnewScheduler,
    getNewsletterDetails,
    updateScheduleStatus
}