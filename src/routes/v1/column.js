const express = require('express');
const router = express.Router();

//middleware
const columnValid = require('../../validations/ColumnValid');

const columnController = require('../../controllers/v1/ColumnController');

router.post('/', columnValid.checkCreateNewColumn, columnController.createColumn);
router.put('/:id', columnValid.checkUpdateColumn, columnController.updateColumn);



module.exports = router;