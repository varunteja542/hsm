// models/app.js
const db = require('../config/database');

// Function to fetch doctors from the `doctors` table
exports.getDoctors = (callback) => {
  const query = 'SELECT id, name, specialization, TIME_FORMAT(available_time, "%h:%i %p") AS available_time FROM doctors';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching doctors:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

// Function to save appointment data to the `appointments` table
exports.saveAppointment = (appointmentData, callback) => {
  const { name, age, mobile, email, doctor, date_of_appointment } = appointmentData;

  // Basic validation
  if (!name || !age || !mobile || !doctor || !date_of_appointment) {
    return callback(new Error('All fields are required'));
  }

  const query = `INSERT INTO appointment (patient_name, age, mobile_no, email, doctor_id, appointment_date, appointment_time)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  const appointmentTime = '09:00:00'; // Default appointment time

  db.query(query, [name, age, mobile, email || null, doctor, date_of_appointment, appointmentTime], (err, result) => {
    if (err) {
      console.error('Error saving appointment:', err);
      return callback(err);
    }
    callback(null, result);
  });
};
