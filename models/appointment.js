// models/appointment.js
const db = require('../config/database');

class Appointment {
    static create(patientId, doctorId, date, status = 'Pending') {
        return db.execute(
            'INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)',
            [patientId, doctorId, date, status]
        );
    }

    static getAll() {
        return db.execute('SELECT * FROM appointments');
    }

    static updateStatus(appointmentId, status) {
        return db.execute(
            'UPDATE appointments SET status = ? WHERE id = ?',
            [status, appointmentId]
        );
    }

    // Additional methods can be added here as needed
}

module.exports = Appointment;
