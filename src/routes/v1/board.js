const express = require('express');
const router = express.Router();

//middleware
const boardValid = require('../../validations/BoardValid');

const boardController = require('../../controllers/v1/BoardController');

//get list of board
router.post('/', boardValid.checkCreateNewBoard, boardController.createBoard);

//get particular board
router.get('/:id', boardController.getBoard);

//update board
router.put('/:id', boardValid.checkUpdateBoard, boardController.updateBoard);

module.exports = router;