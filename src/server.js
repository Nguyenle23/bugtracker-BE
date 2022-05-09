const express = require('express');
const BoardModel = require('./models/Board.js');
const ColumnModel = require('./models/Column.js');
const CardModel = require('./models/Card.js');

//connect database
const mongodb = require('./config/mongodb.js');
mongodb.connect();

const app = express();

const port = '4444';

app.get("/test", async(req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server listen at http://localhost:${port}`);
});