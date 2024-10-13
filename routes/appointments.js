// routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// POST /appointments/add
router.post('/add', async (req, res) => {
    try {
        const { patientId, doctorId, date, status } = req.body; // Include status from request body
        await Appointment.create(patientId, doctorId, date, status);
        res.status(201).json({ message: 'Appointment created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating appointment', error });
    }
});

// You can add more routes for fetching appointments, etc. here

module.exports = router;
