const express = require('express');
const router = express.Router();

//middleware
const boardValid = require('../../validations/boardValid');

const boardController = require('../../controllers/v1/BoardController');

router.get('/', boardController.showBoard);
router.post('/', boardValid.checkCreateNewBoard, boardController.createBoard);


module.exports = router;