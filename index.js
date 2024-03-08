const express = require('express');
const handler = require('./api/cart.js');
const { Pool } = require('pg');
require('dotenv').config();
const authorizeToken = require('./middleware/auth.js')
const cors = require('cors')

//Skapar en Express applikation
const app = express();


// Allow requests from http://localhost:8080
const corsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors());
/*
app.use(cors(corsOptions))

app.options('*', cors());

// Allow patch 
app.patch('*', cors());*/




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
//app.use('/cart', cart)
app.use('/cart', cart)

// Startar servern
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
