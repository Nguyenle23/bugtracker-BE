const Board = require('../models/Board');

const createNewBoard = async(data) => {
    try {
        const result = await Board.createNewBoard(data);
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNewBoard };