const express = require('express');
const route = require('./route/v1');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');


const app = express();
const port = '4444';

//connect database
const mongodb = require('./config/mongodb.js');
mongodb.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

route(app);

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function(req, res) {
    console.log(req.body)

    res.send('welcome, ' + req.body.title)
})

// POST /api/users gets JSON bodies
app.get('/login', jsonParser, function(req, res) {
    res.send(`
      <form method="post" action="/login">
      <input type="text" name="title" placeholder="Board name">
        <button id="create-board">Create board</button>
      </form>
    `);

})

app.listen(port, () => {
    console.log(`Server listen at http://localhost:${port}`);
});