const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();



const db_URL = process.env.DATABASE_URL;


const pool = new Pool({
    connectionString: db_URL,
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
  
app.post('/', async (req, res) => { 
    const { customerid, product, amount, price } = req.body;

    try {
        const result = await pool.query('INSERT INTO products (customerid, product, amount, price) VALUES ($1, $2, $3, $4) RETURNING *', [customerid, product, amount,price]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding product to the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = app;