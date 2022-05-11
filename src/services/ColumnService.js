const Column = require('../models/Column');
const Board = require('../models/Board');
const Card = require('../models/Card');

const createNewColumn = async(data) => {
    try {
        const createNewColumn = await Column.createNewColumn(data);

        const getNewColumn = await Column.findOneAndById(createNewColumn.insertedId.toString());
        getNewColumn.cards = [];

        //update columnOrder in board
        await Board.updateColumnOrder(getNewColumn.boardId.toString(), getNewColumn._id.toString());

        return getNewColumn;
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

const updateColumn = async(id, data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: Date.now()
        }
        if (updateData._id) delete updateData._id;
        if (updateData.cards) delete updateData.cards;

        const updatedColumn = await Column.updateColumn(id, updateData);

        if (updatedColumn._destroy) {
            //delete cards in column
            Card.deleteCard(updatedColumn.cardOrder);
        }


        return updatedColumn;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNewColumn, updateColumn };