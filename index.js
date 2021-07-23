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

// Directorio público
app.use( express.static('public'));

app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth'));
app.use( '/api/hospitales', require('./routes/hospitales'));
app.use( '/api/medicos', require('./routes/medicos'));
app.use( '/api/todo', require('./routes/busquedas'));
app.use( '/api/upload', require('./routes/uploads'));



app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT)
})