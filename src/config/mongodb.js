require('dotenv').config();
const { MongoClient } = require('mongodb');


// Connection URL
const url = process.env.MONGODB_URL;
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Database Name
const dbName = 'bugtracker';

async function connect() {
    try {
        await client.connect();
        console.log('Connection successful');
    } catch (err) {
        console.log('Connection failed')
    } finally {
        //esure client is closed when finish/error 
        await client.close();
    }
}

module.exports = { connect };