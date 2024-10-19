const db = require('../config/database');
    exports.getAllPatients= (callback) => {
      const query = 'SELECT * FROM patients';
  console.log('executing sql');
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching doctors:', err);
      return callback(err);
    }
    callback(null, results);
  });
    };
  
   exports. addPatient = ( patientData, callback) => {
      const { name, age, address, contact_number, email, disease, doctor_id } = patientData;
      let sql = 'INSERT INTO patients (name, age, address, contact_number, email, disease, doctor_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(sql, [name, age, address, contact_number, email, disease, doctor_id], callback);
    };
  
  