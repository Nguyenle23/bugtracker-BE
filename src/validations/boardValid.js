const Joi = require('joi');

const statusCode = require('../utilities/constants');

const checkCreateNewBoard = async(req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().required().min(3).max(20).trim(),
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

const checkUpdateBoard = async(req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().min(3).max(20).trim(),
        columnOrder: Joi.array().items(Joi.string()),
    })
    try {
        await condition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true // allow unknown keys after update object
        })
        next()
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).json({
            error: error.message
        })
    }
}

module.exports = { checkCreateNewBoard, checkUpdateBoard }