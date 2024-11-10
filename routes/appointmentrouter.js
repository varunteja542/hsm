// routes/appointmentrouter.js
const express = require('express');
const router = express.Router();
const Appointments = require('../models/app');

// Route to fetch doctors as JSON
router.get('/doctors', (req, res) => {
  Appointments.getDoctors((err, doctors) => {
    if (err) {
      return res.status(500).send('Error fetching doctors');
    }
    res.json(doctors);
  });
});

// Check if a date is fully booked for a doctor
router.get('/check_availability', (req, res) => {
  const { doctor } = req.query;
  if (!doctor) return res.status(400).send('Doctor ID required');

  Appointments.getUnavailableDates(doctor, (err, dates) => {
    if (err) {
      return res.status(500).send('Error checking availability');
    }
    res.json(dates);
  });
});

// Define the POST route to submit an appointment
router.post('/submit_appointment', (req, res) => {
  console.log('Incoming appointment data:', req.body); // Log incoming data
  const appointmentData = req.body;

  Appointments.checkExistingAppointment(appointmentData.mobile, appointmentData.date_of_appointment, (err, exists) => {
    if (err) return res.status(500).send('Error checking existing appointment');
    if (exists) return res.status(400).send('One booking per mobile number per day is allowed');

    Appointments.saveAppointment(appointmentData, (err, result) => {
      if (err) {
        return res.status(500).send('Error saving appointment');
      }
      res.redirect('/success.html');
    });
  });
});
router.get('/appointments/today2', (req, res) => {
  console.log('Fetching today\'s appointments...');
  Appointments.getTodayAppointments((err, appointments) => {
    if (err) {
      console.error('Error fetching today\'s appointments:', err);
      return res.status(500).send('Error fetching today\'s appointments');
    }
    console.log('Today\'s appointments:', appointments);
    res.json(appointments);
  });
});

// Route to get past appointments
router.get('/appointments/past', (req, res) => {
  Appointments.getPastAppointments((err, appointments) => {
    if (err) {
      return res.status(500).send('Error fetching past appointments');
    }
    res.json(appointments);
  });
});

// Route to get future appointments
router.get('/appointments/future', (req, res) => {
  Appointments.getFutureAppointments((err, appointments) => {
    if (err) {
      return res.status(500).send('Error fetching future appointments');
    }
    res.json(appointments);
  });
});

// Export the router
// Export the router
module.exports = router;
