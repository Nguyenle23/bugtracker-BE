const Joi = require('joi');
const mongodb = require('../config/mongodb.js');

const card = 'cards';

const cardSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async(data) => {
    return await cardSchema.validateAsync(data, { abortEarly: false });
}

const createNewCard = async(data) => {
    try {
        const value = await validateSchema(data)
        const db = await mongodb.getDB();
        const result = await db.collection(card).insertOne(value);
        return result.ops[0]
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createNewCard };