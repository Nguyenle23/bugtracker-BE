const Joi = require('joi');

const statusCode = require('../utilities/constants');

const checkCreateNewBoard = async(req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().required().min(3).max(20),
    })
    try {
        await condition.validateAsync(req.body)
        next()
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).json({
            error: error.message
        })
    }
}

module.exports = { checkCreateNewBoard }