// config/database.js

const mysql = require('mysql2');

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Replace with your database username
  password: '12345vt6',  // Replace with your database password
  database: 'hospitalmanagement'  // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL database:', err);
    throw err;
  }
  console.log('Connected to the MySQL database');
});

module.exports = db;