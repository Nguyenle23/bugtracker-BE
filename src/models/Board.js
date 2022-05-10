const Joi = require('joi');
const mongodb = require('../config/mongodb.js');

const board = 'boards';

const boardSchema = Joi.object({
    title: Joi.string().required().min(3).max(20),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async(data) => {
    return await boardSchema.validateAsync(data, { abortEarly: false });
}

const createNewBoard = async(data) => {
    try {
        const value = await validateSchema(data)
        const db = await mongodb.getDB();
        const result = await db.collection(board).insertOne(value);
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNewBoard };