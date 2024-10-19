const db = require('../config/database');

// Function to fetch all doctors
exports.getAllDoctors = () => {
  const query = 'SELECT id, name, specialization, TIME_FORMAT(available_time, "%h:%i %p") AS available_time FROM doctors';
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching doctors:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Function to add a new doctor
exports.addDoctor = (doctorData) => {
  const { name, specialization, email, available_time } = doctorData;
  const sql = 'INSERT INTO doctors (name, specialization, email, available_time) VALUES (?, ?, ?, ?)';

  return new Promise((resolve, reject) => {
    db.query(sql, [name, specialization, email, available_time], (err, result) => {
      if (err) {
        console.error('Error adding doctor:', err);
        return reject(err);
      }
      resolve(result);
    });
  });
};
