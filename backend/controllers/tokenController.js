const { allocateToken, cancelToken } = require('../utils/allocator');
const Token = require('../models/token');
const slots = require('../data/slots');

let tokenIdCounter = 1;

exports.addToken = (req, res) => {
    const { slotId, patientId, source } = req.body;
    const slot = slots.find(s => s.id === slotId);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    const token = new Token(tokenIdCounter++, patientId, source);
    const result = allocateToken(slot, token);
    res.json({ token, result });
};

exports.cancelToken = (req, res) => {
    const tokenId = parseInt(req.params.id);
    let found = false;
    for (let slot of slots) {
        if (cancelToken(slot, tokenId)) found = true;
    }
    if (found) res.json({ message: 'Token cancelled' });
    else res.status(404).json({ message: 'Token not found' });
};
