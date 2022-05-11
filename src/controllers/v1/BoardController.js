const statusCode = require('../../utilities/constants');

const boardService = require('../../services/BoardService');

const createBoard = async(req, res) => {
    try {
        const result = await boardService.createNewBoard(req.body);
        res.status(statusCode.OK).json(result)
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message
        })
    }
}

const getBoard = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await boardService.getBoard(id);
        res.status(statusCode.OK).json(result)
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message
        })
    }
}

module.exports = { createBoard, getBoard }