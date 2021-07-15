//npm install mongoose --save
//npm i dotenv
//npm i cors
//npm i express-validator
//npm i bcryptjs


const express = require('express');
require('dotenv').config();
var cors = require('cors');
const { dbConnection } = require('./database/config');

const  app = express();

app.use(cors( { cors: { origin: "*", method: ["GET","POST"] }} ));

app.use( express.json() );

dbConnection();

app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth'));



app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT)
})