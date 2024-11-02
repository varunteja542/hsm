const db = require('../config/database'); // Assuming you have a db configuration file

// Export functions for doctor model

// Get doctor by email and password
// In doctorModel.js
exports.getDoctorByEmailAndPassword = (email, password) => {
    const query = 'SELECT id, name, email FROM doctors WHERE email = ? AND password = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [email, password], (err, results) => {
            if (err) return reject(err);
            if (results.length > 0) {
                resolve(results[0]); // Return the doctor object if found
            } else {
                resolve(null); // Return null if no matching doctor
            }
        });
    });
};


exports.getDoctorById = (doctorId) => {
    const query = 'SELECT * FROM doctors WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [doctorId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length > 0) {
                resolve(rows[0]); // Return the doctor object if found
            } else {
                resolve(null); // Return null if no matching doctor
            }
        });
    });
};

// Get today's appointments for a doctor
exports.getTodaysAppointments = (doctorId) => {
    const query = `SELECT * FROM appointment WHERE doctor_id = ? AND appointment_date = CURDATE()`;
    return new Promise((resolve, reject) => {
        db.query(query, [doctorId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows); // Return all today's appointments
        });
    });
};
exports.getTodaysAppointments2 = () => {
    const query = `SELECT * FROM appointment WHERE  appointment_date = CURDATE()`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, rows) => {
            console.log("model");
            if (err) return reject(err);
            resolve(rows); // Return all today's appointments
        });
    });
};

// Get past appointments for a doctor
exports.getPastAppointments = (doctorId) => {
    const query = `SELECT * FROM appointment WHERE doctor_id = ? AND appointment_date < CURDATE()`;
    return new Promise((resolve, reject) => {
        db.query(query, [doctorId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows); // Return all past appointments
        });
    });
};

// Get future appointments for a doctor
exports.getFutureAppointments = (doctorId) => {
    const query = `SELECT * FROM appointment WHERE doctor_id = ? AND appointment_date > CURDATE()`;
    return new Promise((resolve, reject) => {
        db.query(query, [doctorId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows); // Return all future appointments
        });
    });
};

// Confirm an appointment by ID
exports.confirmAppointment = (appointmentId) => {
    const query = `UPDATE appointment SET status = 'confirmed' WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [appointmentId], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0); // Return true if confirmed, false otherwise
        });
    });
};
exports.addDoctor = ({ name, specialization, email, available_time, password }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO doctors (name, specialization, email, available_time, password) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, specialization, email, available_time, password], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0); // Return true if a doctor was added
        });
    });
};