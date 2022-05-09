const Joi = require('joi');
const mongodb = require('../config/mongodb.js');

const column = 'columns';

const columnSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async(data) => {
    return await columnSchema.validateAsync(data, { abortEarly: false });
}

const createNewColumn = async(data) => {
    try {
        const value = await validateSchema(data)
        const db = await mongodb.getDB();
        const result = await db.collection(column).insertOne(value);
        return result.ops[0]
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createNewColumn };