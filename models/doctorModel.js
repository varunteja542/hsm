module.exports = {
    getAllDoctors: (db, callback) => {
      db.query('SELECT * FROM doctors', callback);
    },
  
    addDoctor: (db, doctorData, callback) => {
      const { name, specialization, contact_number, email } = doctorData;
      let sql = 'INSERT INTO doctors (name, specialization, contact_number, email) VALUES (?, ?, ?, ?)';
      db.query(sql, [name, specialization, contact_number, email], callback);
    }
  };
  