const doctors = require('../data/doctors');
const Doctor = require('../models/doctor');

let doctorIdCounter = 1;

exports.addDoctor = (req, res) => {
    const { name } = req.body;
    const doctor = new Doctor(doctorIdCounter++, name);
    doctors.push(doctor);
    res.json(doctor);
};

exports.getDoctors = (req, res) => res.json(doctors);
