const Joi = require('joi');
const mongodb = require('../config/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const getColumn = require('./Column');
const getCard = require('./Card');
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

const findOneAndById = async(id) => {
    try {
        const db = await mongodb.getDB();
        const result = await db.collection(board).findOne({
            _id: ObjectId(id),
        });
        return result;
    } catch (error) {
        throw new Error(error);
    }
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

/**
 * 
 * @param {String} boardId 
 * @param {String} columnId 
 * @returns 
 */
const updateColumnOrder = async(boardId, columnId) => {
    try {
        const db = await mongodb.getDB();
        const result = await db.collection(board).findOneAndUpdate({ _id: ObjectId(boardId) }, { $push: { columnOrder: columnId } }, { returnDocument: 'after' });
        return result.value;
    } catch (error) {
        throw new Error(error)
    }
}

const getBoard = async(boardId) => {
    try {
        const db = await mongodb.getDB();
        const result = await db.collection(board).aggregate([{
                $match: {
                    _id: ObjectId(boardId),
                }
            },
            //convert id String to id ObjectId
            // { 
            //     $addFields: {
            //         _idToString: { $toString: '$_id' },
            //     }
            // },
            {
                $lookup: {
                    from: getColumn.column,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'columns'
                }
            },
            {
                $lookup: {
                    from: getCard.card, //collection name
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'cards'
                }
            }
        ]).toArray();
        return result[0] || {};
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { findOneAndById, createNewBoard, getBoard, updateColumnOrder };