const express = require('express');
const router = express.Router();

//middleware
const boardValid = require('../../validations/BoardValid');

const boardController = require('../../controllers/v1/BoardController');

//get particular board
router.get('/:id', boardController.getBoard);

//get list of board
router.post('/', boardValid.checkCreateNewBoard, boardController.createBoard);


module.exports = router;