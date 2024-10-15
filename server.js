// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database'); // Import database connection

// Create Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (for HTML form)
app.use(express.static(path.join(__dirname, 'public')));

// Set db connection to the request
app.use((req, res, next) => {
  req.db = db; // Attach db connection to request object
  next(); // Proceed to the next middleware
});

// Import and use routers
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const appRoutes = require('./routes/appointmentrouter');

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/api', appRoutes); // Base route to serve the appointment form

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
