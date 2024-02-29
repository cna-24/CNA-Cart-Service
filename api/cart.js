const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();
const db_URL = process.env.DATABASE_URL;


//Connectar till databasen
const pool = new Pool({
    connectionString: db_URL,
});


//Hanterar GET request till endpointen
app.get('/', async (req, res) => {
    try {
        //Executar en SQL SELECT query på tabellen "products" (tabellen innehåller alla carts) genom att använda pool
        //Get alla kolumner i tabellen, väljer ordning hur dom visas genom att skriva ut kolumnnamnen
        const result = await pool.query('SELECT id, user_id, products, quantity, price FROM products');

        //Skickar JSON response med result
        res.json(result.rows);

        //Felhantering
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Hanterar GET request för specifik cart_id
app.get('/:id', async (req, res) => {
    //Hämtar cart_id från url
    const cartId = req.params.id;
    try {
        //Executar eb SQL SELECT query på tabellen för det specifika cart_id
        const result = await pool.query('SELECT id, user_id, products, quantity, price FROM products WHERE id = $1', [cartId]);

        //KOllar om det finns ett resultat, isåfall skrivs result ut, annars skrivs ett felmeddelande ut
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json({ error: 'Cart not found' })
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Executar en POST request till endpointen
app.post('/', async (req, res) => {
    //Hämtar data från request bodyn
    const { user_id, product, quantity, price } = req.body;

    try {
        //Executar en SQL INSERT query för att lägga till en ny rad i tabellen "producs"t"
        const result = await pool.query('INSERT INTO products (user_id, product, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, product, quantity, price]);
        //Om insättningen lyckas skrivs resultatet ut
        res.status(201).json(result.rows[0]);

        //Felhantering
    } catch (error) {
        console.error('Error adding cart to the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Hanterar PATCH requests för en specifik cart_id till endpointen
app.patch('/:id', async (req, res) => {
    //Hämtar id från request URL
    const cartId = req.params.id;
    //Hämtar data från request bodyn
    const { user_id, product, quantity, price } = req.body;

    try {
        //Executar en SQL  UPDATE query för att uppdatera raden för den specifika id:n i tabellen "products"
        const result = await pool.query(
            'UPDATE products SET user_id = $1, product = $2, quantity = $3, price = $4 WHERE id = $5 RETURNING *',
            [user_id, product, quantity, price, cartId]
        );
        //Om ingen rad hittades
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        //Skriv ut den nya raden  ifall raden hittades och uppdaterades
        res.json(result.rows[0]);

        //felhantering
    } catch (error) {
        console.error('Error updating cart in the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
)
//Hanterar DELETE request för en specifik cart_id
app.delete('/:id', async (req, res) => {
    //Hämtar cart_id från request url
    const cartId = req.params.id;

    try {
        //Executar en SQL DELETE query för den specifika cart_id i tabellen "products"
        const result = await pool.query('DELETE FROM products WHERE id = $1', [cartId]);

        //Ifall ingen rad hittas
        if (result.rowCount === 0) {

            return res.status(404).json({ error: 'Cart not found' });
        }
        //Om borttagningen lyckades
        res.json({ message: 'Cart deleted successfully' });

        //Felhantering
    } catch (error) {
        console.error('Error deleting cart from the database:', error);
        res.status(500).json({ error: 'Internal server error' });

    }

})


module.exports = app;