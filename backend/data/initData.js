const doctors = require('./doctors');
const slots = require('./slots');
const Slot = require('../models/slot');
const { allocateToken } = require('../utils/allocator');
const Token = require('../models/token');

let tokenIdCounter = 1;
const SOURCES = ['online', 'walkin', 'paid', 'followup', 'emergency'];

const doctorNames = ['Dr. Verma', 'Dr. Dantre', 'Dr. Patel'];

doctorNames.forEach((name, index) => {
    const doctorId = index + 1;
    doctors.push({ id: doctorId, name, slots: [] });

    for (let i = 0; i < 4; i++) {
        const startTime = `${9 + i}:00`;
        const endTime = `${10 + i}:00`;
        const slot = new Slot(slots.length + 1, doctorId, startTime, endTime, 3);
        slots.push(slot);
        doctors[index].slots.push(slot);

        const tokenCount = Math.floor(Math.random() * 3) + 1;
        for (let t = 0; t < tokenCount; t++) {
            const source = SOURCES[Math.floor(Math.random() * SOURCES.length)];
            const token = new Token(tokenIdCounter++, `P${slots.length}${t}`, source);
            allocateToken(slot, token);
        }
    }
});

module.exports = { doctors, slots };
