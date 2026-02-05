const slots = require('../data/slots');
const Slot = require('../models/slot');

let slotIdCounter = 1;

exports.addSlot = (req, res) => {
    const { doctorId, startTime, endTime, capacity } = req.body;
    const slot = new Slot(slotIdCounter++, doctorId, startTime, endTime, capacity);
    slots.push(slot);
    res.json(slot);
};

exports.getSlot = (req, res) => {
    const slot = slots.find(s => s.id === parseInt(req.params.id));
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    res.json(slot);
};

exports.getAllSlots = (req, res) => res.json(slots);
