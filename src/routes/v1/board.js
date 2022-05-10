const express = require('express');
const router = express.Router();

//middleware
const boardValid = require('../../validations/BoardValid');

const boardController = require('../../controllers/v1/BoardController');

router.post('/', boardValid.checkCreateNewBoard, boardController.createBoard);
router.get('/', boardController.showBoard);


module.exports = router;