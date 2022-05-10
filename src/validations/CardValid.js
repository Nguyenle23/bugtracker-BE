const Joi = require('joi');

const statusCode = require('../utilities/constants');

const checkCreateNewCard = async(req, res, next) => {
    const condition = Joi.object({
        boardId: Joi.string().required(),
        columnId: Joi.string().required(),
        title: Joi.string().required().min(3).max(30).trim(),
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).json({
            error: error.message
        })
    }
}

const checkUpdateCard = async(req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().min(3).max(20).trim(),
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

module.exports = { checkCreateNewCard, checkUpdateCard }