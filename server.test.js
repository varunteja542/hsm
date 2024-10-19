const request = require('supertest');
const app = require('./server');
const db = require('./config/database');  // Import database connection

let server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    console.log('Test server running on port 3000');
    done();
  });
});

afterAll((done) => {
  // Close the server and database connection after tests
  server.close(() => {
    console.log('Test server closed');
    db.end(() => {
      console.log('Database connection closed');
      done();
    });
  });
});

describe('GET /patients', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/patients');
    expect(res.statusCode).toEqual(200);
  });
});
