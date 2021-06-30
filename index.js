//npm install mongoose --save
//npm i dotenv
//npm i cors

const express = require('express');
require('dotenv').config();
var cors = require('cors');
const { dbConnection } = require('./database/config');

const  app = express();

app.use(cors( { cors: { origin: "*", method: ["GET","POST"] }} ));

dbConnection();

app.get('/', ( req, res ) => {
    res.json({
        ok:true,
        msg: 'Hola mundo'
    })
})

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT)
})