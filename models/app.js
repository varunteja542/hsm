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

// Function to get unavailable dates for a doctor based on appointment count
exports.getUnavailableDates = (doctorId, callback) => {
  const query = `
    SELECT appointment_date
    FROM appointment
    WHERE doctor_id = ? 
    GROUP BY appointment_date
    HAVING COUNT(*) >= 15;
  `;

  db.query(query, [doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching unavailable dates:', err);
      return callback(err);
    }
    const dates = results.map(row => row.appointment_date);
    callback(null, dates);
  });
};

// Function to check if a mobile number has already booked an appointment on a specific date
exports.checkExistingAppointment = (mobile, date, callback) => {
  const query = 'SELECT * FROM appointment WHERE mobile_no = ? AND appointment_date = ?';

  db.query(query, [mobile, date], (err, results) => {
    if (err) {
      console.error('Error checking existing appointment:', err);
      return callback(err);
    }
    callback(null, results.length > 0);
  });
};

// Function to save appointment data to the `appointments` table
exports.saveAppointment = (appointmentData, callback) => {
  const { name, age, mobile, email, doctor, date_of_appointment } = appointmentData;

  // Basic validation
  if (!name || !age || !mobile || !doctor || !date_of_appointment) {
    return callback(new Error('All fields except email are required'));
  }

  const query = 'INSERT INTO appointment (patient_name, age, mobile_no, email, doctor_id, appointment_date) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, age, mobile, email, doctor, date_of_appointment];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving appointment:', err);
      return callback(err);
    }
    callback(null, result);
  });
};
