const Card = require('../models/Card');
const Column = require('../models/Column');

const createNewCard = async(data) => {
    try {
        const createNewCard = await Card.createNewCard(data);
        const getNewCard = await Card.findOneAndById(createNewCard.insertedId.toString());

        //update columnOrder in board
        await Column.updateColumnOrder(getNewCard.columnId.toString(), getNewCard._id.toString());

        return getNewCard;
    } catch (error) {
        throw new Error(error)
    }
}

const updateCard = async(id, data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: Date.now()
        }
        const result = await Card.updateCard(id, updateData);
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNewCard, updateCard };