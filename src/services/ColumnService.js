const Column = require('../models/Column');

const createNewColumn = async(data) => {
    try {
        const result = await Column.createNewColumn(data);
        return result;
    } catch (error) {
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
        console.log(updateData)
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNewColumn, updateColumn };