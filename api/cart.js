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
      const result = await pool.query('SELECT id, user_id, products, quantity, price FROM products');
      res.json(result.rows);
      
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/:id', async (req, res) => {
    const cartId = req.params.id;
    try {
      const result = await pool.query('SELECT id, user_id, products, quantity, price FROM products WHERE id = $1', [cartId]);
      if (result.rows.length > 0) {
        res.json(result.rows);
    } else {
        res.status(404).json({error: 'Cart not found'})
    }
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.post('/', async (req, res) => { 
    const { user_id, product, quantity, price } = req.body;

    try {
        const result = await pool.query('INSERT INTO products (user_id, product, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, product, quantity,price]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding cart to the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/:id', async (req, res) => {
    const cartId = req.params.id;
    const {user_id, product, quantity, price}=req.body;

    try{
        const result = await pool.query(
            'UPDATE products SET user_id = $1, product = $2, quantity = $3, price = $4 WHERE id = $5 RETURNING *',
            [user_id, product, quantity, price, cartId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating cart in the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    }
)

app.delete('/:id', async (req, res) => {
    const cartId = req.params.id;

    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1', [cartId]);

        if (result.rowCount === 0) {

            return res.status(404).json({ error: 'Cart not found' });
        }

        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart from the database:', error);
        res.status(500).json({ error: 'Internal server error' });

    }

})


module.exports = app;