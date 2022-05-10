const express = require('express');
const router = express.Router();

const boardController = require('../../controller/BoardController')

router.post('/', boardController.createBoard);
router.get('/', boardController.showBoard);

module.exports = router;