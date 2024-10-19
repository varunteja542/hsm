const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Importing routers
const appointmentRouter = require('./routes/appointmentrouter');
const doctorRouter = require('./routes/doctors');
const patientRouter = require('./routes/patients');

// Mounting routers
app.use('/appointment', appointmentRouter);  // For appointment-related routes
app.use('/doctor', doctorRouter);  // For doctor-related routes
app.use('/patients', patientRouter);  // For patient-related routes

// Export app for testing
module.exports = app;
