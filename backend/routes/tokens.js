const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.post('/', tokenController.addToken);
router.post('/:id/cancel', tokenController.cancelToken);

module.exports = router;
