module.exports = {
    getAllPatients: (db, callback) => {
      db.query('SELECT * FROM patients', callback);
    },
  
    addPatient: (db, patientData, callback) => {
      const { name, age, address, contact_number, email, disease, doctor_id } = patientData;
      let sql = 'INSERT INTO patients (name, age, address, contact_number, email, disease, doctor_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(sql, [name, age, address, contact_number, email, disease, doctor_id], callback);
    }
  };
  