// routes/appointmentrouter.js
const express = require('express');
const router = express.Router();
const Appointments = require('../models/app');

// Route to fetch doctors as JSON
router.get('/doctors', (req, res) => {
  Appointments.getDoctors((err, doctors) => {
    if (err) {
      console.error('Error fetching doctors:', err);
      return res.status(500).send('Error fetching doctors');
    }
    res.json(doctors);
  });
});

// Define the POST route to submit an appointment
router.post('/submit_appointment', (req, res) => {
  const appointmentData = req.body;

  Appointments.saveAppointment(appointmentData, (err, result) => {
    if (err) {
      return res.status(500).send('Error saving appointment');
    }
    // Redirect to success page
    res.redirect('/success.html'); // Ensure this path matches your public directory structure
  });
});

// Export the router
module.exports = router;
