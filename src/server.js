const express = require('express');
const mapOrder = require('./utilities/sort.js');

//connect database
const mongodb = require('./config/mongodb.js');
mongodb.connect();

const app = express();

const port = '4444';

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server listen at http://localhost:${port}`);
});