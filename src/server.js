const express = require('express');
const mapOrder = require('./utilities/sort.js');

const app = express();

const port = '4444';

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server listen at http://localhost:${port}`);
});