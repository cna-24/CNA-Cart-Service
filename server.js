const express = require('express');
const handler = require('./api/cart.js'); 
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

const PORT = 3000; 

const db_URL = process.env.DATABASE_URL;


const pool = new Pool({
    connectionString: db_URL,
  });


  app.use(express.json());

  app.use('/', express.static(__dirname + '/'))

  const cart = require('./api/cart.js')
  app.use('/cart', cart)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
