const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: true } // In production, enforce valid SSL certificates
    : { rejectUnauthorized: false } // In development, accept self-signed certificates
});

// Test the connection

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL not set');
} else {
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
    } else {
      console.log('Connected to database:', process.env.DATABASE_URL);
    }
  });
}

module.exports = pool;