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

const updateCard = async(id, data) => {
    try {
        const updateData = {...data };
        if (data.boardId) {
            updateData.boardId = ObjectId(data.boardId);
        }
        if (data.columnId) {
            updateData.columnId = ObjectId(data.columnId);
        }

        const db = await mongodb.getDB();
        const result = await db.collection(card).findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateData }, { returnDocument: 'after' });
        return result.value;
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * 
 * @param {Array of string card id} ids 
 */
const deleteCard = async(ids) => {
    try {
        const transformedIds = ids.map(id => ObjectId(id));
        const db = await mongodb.getDB();
        const result = await db.collection(card).updateMany({ _id: { $in: transformedIds } }, { $set: { _destroy: true } });
        return result
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { card, findOneAndById, createNewCard, updateCard, deleteCard };