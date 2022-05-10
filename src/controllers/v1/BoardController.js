const statusCode = require('../../utilities/constants');

const boardService = require('../../services/boardService');

const createBoard = async(req, res) => {
    try {
        console.log(req.body);
        const result = await boardService.createNewBoard(req.body);
        console.log(result);
        res.status(statusCode.OK).json(result)
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message
        })
    }
}

const showBoard = async(req, res) => {
    res.send(
        `
        <h1>Board</h1>
        <form action="/v1/board" method="POST">
            <input type="text" name="title" placeholder="Title">
            <input type="submit" value="Create">
        </form>
        `
    );
}

module.exports = { createBoard, showBoard }