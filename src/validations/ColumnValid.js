const Joi = require('joi');

const statusCode = require('../utilities/constants');

const checkCreateNewColumn = async(req, res, next) => {
    const condition = Joi.object({
        boardId: Joi.string().required(),
        title: Joi.string().required().min(3).max(20).trim(),
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

const checkUpdateColumn = async(req, res, next) => {
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

module.exports = { checkCreateNewColumn, checkUpdateColumn }