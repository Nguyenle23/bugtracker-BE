const Joi = require('joi');
const mongodb = require('../config/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const card = 'cards';

const cardSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(30),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async(data) => {
    return await cardSchema.validateAsync(data, { abortEarly: false });
}

const findOneAndById = async(id) => {
    try {
        const db = await mongodb.getDB();
        const result = await db.collection(card).findOne({
            _id: ObjectId(id),
        });
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const createNewCard = async(data) => {
    try {
        const validatedValue = await validateSchema(data);
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId),
            columnId: ObjectId(validatedValue.columnId),
        }
        const db = await mongodb.getDB();
        const result = await db.collection(card).insertOne(insertValue);
        return result
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { card, findOneAndById, createNewCard, };