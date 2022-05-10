const express = require('express');
const router = express.Router();
const statusCode = require('../../utilities/constants');

const boardRouter = require('./board');

// function route(app) {
//     app.use('/v1/board', boardRouter);
// }
// module.exports = route;


router.get('/status', (req, res) => {
    res.status(statusCode.OK).json({
        status: 'OK',
    });
});

router.use('/board', boardRouter);

module.exports = router;