const express = require('express');
const router = express.Router();
const patientModel = require('../models/patientModel');

// Get all patients
router.get('/', (req, res) => {
  patientModel.getAllPatients(req.db, (err, patients) => {
    if (err) res.status(500).send(err);
    else res.json(patients);
  });
});

// Add a new patient
router.post('/add', (req, res) => {
  const { name, age, address, contact_number, email, disease, doctor_id } = req.body;
  patientModel.addPatient(req.db, { name, age, address, contact_number, email, disease, doctor_id }, (err, result) => {
    if (err) res.status(500).send(err);
    else res.send('Patient added successfully.');
  });
});

module.exports = router;
