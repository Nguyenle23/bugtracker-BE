const statusCode = require('../../utilities/constants');

const cardService = require('../../services/CardService');

const createCard = async(req, res) => {
    try {
        console.log(req.body);
        const result = await cardService.createNewCard(req.body);
        res.status(statusCode.OK).json(result)
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message
        })
    }
}

const updateCard = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await cardService.updateCard(id, req.body);
        res.status(statusCode.OK).json(result)
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message
        })
    }
}

module.exports = { createCard, updateCard }