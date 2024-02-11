const express = require('express');
const handler = require('./api/cart.js'); 
const { Pool } = require('pg');
require('dotenv').config();


const db_URL = process.env.DATABASE_URL;
const app = express();
const PORT = 3000; // You can use any port number you prefer

const pool = new Pool({
    connectionString: db_URL,
  });


  //app.use(express.json());

// Route for handling requests
//app.use('/', handler);

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error executing query', err);
    } else {
      console.log('Connected to database. Current time:', res.rows[0].now);
    }
   
  });

  
app.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM products');
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
