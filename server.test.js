const request = require('supertest');
const app = require('./server');  // Your main server file
const db = require('./config/database');  // Import database connection

let server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    console.log('Test server running on port 3000');
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log('Test server closed');
    db.end(() => {
      console.log('Database connection closed');
      done();
    });
  });
});

// Test for GET /patients
describe('/patients/fetch', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/patients/fetch');
    expect(res.statusCode).toEqual(200);
  });
});

// Test for GET /doctors
describe('/doctor/fetch', () => {
  it('should return a list of doctors with 200 OK', async () => {
    const res = await request(app).get('/doctor/fetch');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

// Test for POST /appointment/submit_appointment
describe('POST /appointment/submit_appointment', () => {
  it('should successfully book an appointment', async () => {
    const appointmentData = {
      name: "John Doe",
      age: 30,
      mobile: "1234567890",
      email: "johndoe@example.com",
      doctor: 1,  // Assuming doctor ID 1 exists
      date_of_appointment: "2024-10-19"
    };

    const res = await request(app)
      .post('/appointment/submit_appointment')
      .send(appointmentData);
    
    expect(res.statusCode).toEqual(302);  // Redirect on success
  });

  it('should return 500 for missing fields', async () => {
    const appointmentData = {
      name: "John Doe",
      age: 30,
      mobile: "1234567890",
      doctor: 1  // Missing email and date_of_appointment
    };

    const res = await request(app)
      .post('/appointment/submit_appointment')
      .send(appointmentData);
    
    expect(res.statusCode).toEqual(500);
  });
});

// Test for POST /doctor/add
describe('POST /doctor/add', () => {
  it('should add a new doctor successfully', async () => {
    const doctorData = {
      name: "Dr. Smith",
      specialization: "Cardiology",
      available_time: "10:00:00",
      email: "smith@gmail.com" // Assuming this field is necessary
    };

    const res = await request(app)
      .post('/doctor/add')
      .send(doctorData);
    
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Doctor added successfully.'); // Ensure response matches expected text
  });

  it('should return 500 for missing fields', async () => {
    const doctorData = {
      name: "Dr. Smith",
      specialization: "Cardiology"
      // Missing available_time
    };

    const res = await request(app)
      .post('/doctor/add')
      .send(doctorData);
    
    expect(res.statusCode).toEqual(500);
  });
});
