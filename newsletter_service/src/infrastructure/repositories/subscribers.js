const db = require('../db/db-connector')


const addNewSubscriber = async (entity) => {
    let query = `INSERT INTO newsletterservice.subscribers
    (email, city)
    VALUES($1, $2);`
    const values = [entity.email, entity.city];
    try {
        const { rows } = await db.query(query, values);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const removeSubscriber = async (email) => {
    let query = `delete from newsletterservice.subscribers
    where email =$1;`
    const values = [email];
    try {
        const { rows } = await db.query(query, values);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

const getSubscribers = async (email) => {
    let query = `select email,city from newsletterservice.subscribers;`;
    try {
        const { rows } = await db.query(query);
        return (rows);
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    addNewSubscriber,
    removeSubscriber,
    getSubscribers
}