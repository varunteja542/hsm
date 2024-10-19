const express = require('express');
const router = express.Router();
const doctorModel = require('../models/doctorModel');

// Get all doctors
router.get('/fetch', async (req, res) => {
  try {
    const doctors = await doctorModel.getAllDoctors();
    res.json(doctors);  // Return the list of doctors as JSON
  } catch (err) {
    console.error('Error fetching doctors:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Validate doctor data
const validateDoctorData = (data) => {
  const { name, specialization, email, available_time } = data;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
  return name && specialization && email && available_time && re.test(String(email).toLowerCase());
};

// Add a new doctor
router.post('/add', async (req, res) => {
  const doctorData = req.body;

  if (!validateDoctorData(doctorData)) {
    console.log("Validation failed");
    return res.status(500).send('All fields are required and email must be valid.'); // Return 500 for failed validation
  }

  try {
    await doctorModel.addDoctor(doctorData);
    res.status(200).send('Doctor added successfully.');  // Send success message
  } catch (err) {
    console.error('Error adding doctor:', err.message);
    res.status(500).send('Error adding doctor'); // Handle server error
  }
});

module.exports = router;
