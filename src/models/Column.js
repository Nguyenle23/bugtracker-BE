const Joi = require('joi');
const mongodb = require('../config/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

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

const findOneAndById = async(id) => {
    try {
        const db = await mongodb.getDB();
        const result = await db.collection(column).findOne({
            _id: ObjectId(id),
        });
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {String} columnId 
 * @param {String} cardId 
 * @returns 
 */
const updateColumnOrder = async(columnId, cardId) => {
    try {
        const db = await mongodb.getDB();
        const result = await db.collection(column).findOneAndUpdate({ _id: ObjectId(columnId) }, { $push: { cardOrder: cardId } }, { returnDocument: 'after' });
        return result.value;
    } catch (error) {
        throw new Error(error)
    }
}

const createNewColumn = async(data) => {
    try {
        const validatedValue = await validateSchema(data);
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId),
        }
        const db = await mongodb.getDB();
        const result = await db.collection(column).insertOne(insertValue);
        console.log(result);
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

const updateColumn = async(id, data) => {
    try {
        const db = await mongodb.getDB();
        const result = await db.collection(column).findOneAndUpdate({ _id: ObjectId(id) }, { $set: data }, { returnDocument: 'after' });
        console.log(result);
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { column, findOneAndById, updateColumnOrder, createNewColumn, updateColumn };