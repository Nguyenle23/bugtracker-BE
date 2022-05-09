require('dotenv').config();
const { MongoClient } = require('mongodb');

let dbInstance = null;

// Database Name
const dbName = 'bugtracker';

async function connect() {
    // Connection URL
    const url = process.env.MONGODB_URL;
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    dbInstance = client.db(dbName);
    console.log('Connection successful');
}

async function getDB() {
    if (!dbInstance) throw new Error('Must connect database first');
    return dbInstance;
}

module.exports = { connect, getDB };