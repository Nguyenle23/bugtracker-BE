const Card = require('../models/Card');

const createNewCard = async(data) => {
    try {
        const result = await Card.createNewCard(data);
        return result;
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
        console.log(updateData)
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNewCard, updateCard };