const Board = require('../models/Board');

const createNewBoard = async(data) => {
    try {
        const createNewBoard = await Board.createNewBoard(data);
        const getNewBoard = await Board.findOneAndById(createNewBoard.insertedId.toString());

        return getNewBoard;
    } catch (error) {
        throw new Error(error)
    }
}

const getBoard = async(boardId) => {
    try {
        const getFullBoard = await Board.getBoard(boardId);

        if (!getFullBoard || !getFullBoard.columns) {
            throw new Error('Board not found');
        }

        //add card to each column
        getFullBoard.columns.forEach(column => {
            column.cards = getFullBoard.cards.filter(c => c.columnId.toString() === column._id.toString());
        });

        //sort columns by columnOrder, sort cards by cardOrder --> Reactjs

        //remove field cards[] from board
        delete getFullBoard.cards;

        return getFullBoard;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNewBoard, getBoard };