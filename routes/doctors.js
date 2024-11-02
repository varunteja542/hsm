const express = require('express');
const router = express.Router();
const doctorModel = require('../models/doctorModel');

// Doctor login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const doctor = await doctorModel.getDoctorByEmailAndPassword(email, password);
        if (doctor) {
            res.json({ success: true, doctorId: doctor.id });
        } else {
            res.json({ success: false, message: 'Invalid email or password.' });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


router.post('/confirm', async (req, res) => {
    const { appointmentid } = req.body;
    try {
        const confirmed = await doctorModel.confirmAppointment(appointmentid);
        if (confirmed) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Failed to confirm appointment.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get doctor's profile
router.get('/:doctorId', async (req, res) => {
    const { doctorId } = req.params;
    try {
        const doctor = await doctorModel.getDoctorById(doctorId);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get today's appointments
router.get('/:doctorId/today', async (req, res) => {
    const { doctorId } = req.params;
    try {
        const appointments = await doctorModel.getTodaysAppointments(doctorId);
        console.log("coming router");
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get past appointments
router.get('/:doctorId/past-appointments', async (req, res) => {
    const { doctorId } = req.params;
    try {
        const appointments = await doctorModel.getPastAppointments(doctorId);
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get future appointments
router.get('/:doctorId/future-appointments', async (req, res) => {
    const { doctorId } = req.params;
    try {
        const appointments = await doctorModel.getFutureAppointments(doctorId);
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/appointments/today2', async (req, res) => {
   
    try {
        const appointments = await doctorModel.getTodaysAppointments2();
        console.log("coming router");
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/add', async (req, res) => {
    const { name, specialization, email, available_time, password } = req.body;
    try {
        const result = await doctorModel.addDoctor({ name, specialization, email, available_time, password });
        if (result) {
            res.status(201).send('Doctor added successfully');
        } else {
            res.status(400).send('Failed to add doctor');
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to add doctor' });
    }
});
module.exports = router;
