const statusCode = require('../../utilities/constants');

const columnService = require('../../services/ColumnService');

const createColumn = async(req, res) => {
    try {
        const result = await columnService.createNewColumn(req.body);
        res.status(statusCode.OK).json(result)
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message
        })
    }
}

const updateColumn = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await columnService.updateColumn(id, req.body);
        res.status(statusCode.OK).json(result)
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message
        })
    }
}

module.exports = { createColumn, updateColumn }