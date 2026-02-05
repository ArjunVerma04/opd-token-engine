const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');

router.post('/', slotController.addSlot);
router.get('/:id', slotController.getSlot);
router.get('/', slotController.getAllSlots);

module.exports = router;
