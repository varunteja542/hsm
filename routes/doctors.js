const express = require('express');
const router = express.Router();
const doctorModel = require('../models/doctorModel');

// Get all doctors
router.get('/', (req, res) => {
  doctorModel.getAllDoctors(req.db, (err, doctors) => {
    if (err) res.status(500).send(err);
    else res.json(doctors);
  });
});

// Add a new doctor
router.post('/add', (req, res) => {
  const { name, specialization, contact_number, email } = req.body;
  doctorModel.addDoctor(req.db, { name, specialization, contact_number, email }, (err, result) => {
    if (err) res.status(500).send(err);
    else res.send('Doctor added successfully.');
  });
});

module.exports = router;
