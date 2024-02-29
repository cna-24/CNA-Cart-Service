const express = require('express');
const handler = require('./api/cart.js');
const { Pool } = require('pg');
require('dotenv').config();

//Skapar en Express applikation
const app = express();

//Bestämmer proten som servern kör på
const PORT = process.env.PORT || 8080;

//Hämtar db url
const db_URL = process.env.DATABASE_URL;

//Skapar en Pool instance för att connecta till PostgreSQL databas
const pool = new Pool({
  connectionString: db_URL,
});

//Middlewares
app.use(express.json());

app.use('/', express.static(__dirname + '/'))

//Importerar och skapar cart handler för /cart route
const cart = require('./api/cart.js')
app.use('/cart', cart)

// Startar servern
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
