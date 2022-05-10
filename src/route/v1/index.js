const boardRouter = require('./board');

function route(app) {
    app.use('/v1/board', boardRouter);
}

module.exports = route;