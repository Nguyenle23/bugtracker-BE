const express = require('express');
const router = express.Router();

//middleware
const cardValid = require('../../validations/CardValid');

const cardController = require('../../controllers/v1/CardController');

router.post('/', cardValid.checkCreateNewCard, cardController.createCard);

//update card
router.put('/:id', cardValid.checkUpdateCard, cardController.updateCard);

module.exports = router;