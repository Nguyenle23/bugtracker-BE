const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const corsOptions = require('./config/cors');

const route = require('./routes/v1');
const app = express();
const port = '4444';

//connect database
const mongodb = require('./config/mongodb.js');
mongodb.connect();

//Enable req.body data
app.use(express.json())

app.use(methodOverride('_method'));

app.use(cors(corsOptions));

//APIs v1
app.use('/v1', route);

// route(app);

app.listen(port, () => {
    console.log(`Server listen at http://localhost:${port}`);
});