const Column = require('../models/Column');
const Board = require('../models/Board');

const createNewColumn = async(data) => {
    try {
        const createNewColumn = await Column.createNewColumn(data);

        const getNewColumn = await Column.findOneAndById(createNewColumn.insertedId.toString());

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
        const result = await Column.updateColumn(id, updateData);
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNewColumn, updateColumn };