const express = require('express');
const router = express.Router();
const statusCode = require('../../utilities/constants');

const boardRouter = require('./board');
const columnRouter = require('./column');
const cardRouter = require('./card');

// function route(app) {
//     app.use('/v1/board', boardRouter);
// }
// module.exports = route;

//API test
router.get('/status', (req, res) => {
    res.status(statusCode.OK).json({
        status: 'OK',
    });
});

//API board
router.use('/board', boardRouter);

//API column
router.use('/column', columnRouter);

//API card
router.use('/card', cardRouter);

module.exports = router;