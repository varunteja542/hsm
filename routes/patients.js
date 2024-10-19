const express = require('express');
const router = express.Router();
const patientModel = require('../models/patientModel');

// Get all patients
// In patientRouter.js
router.get('/fetch', (req, res) => {
  console.log("getting patients");
  patientModel.getAllPatients((err, patients) => { // No req.db if you’re not using it here
    if (err) {
      console.error('Error fetching patients:', err);
      res.status(500).send(err);
    } else {
      res.json(patients);
    }
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
