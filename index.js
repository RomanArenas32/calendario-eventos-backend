const express = require('express');
const dbConnection = require('./database/consfig');
require('dotenv').config();
const cors = require('cors')


//create esprexx server

const app = express();

//BD CONNECTION

dbConnection();

//Cors conection

app.use(cors());

//public directory
app.use(express.static('public'));

//read and parse
app.use(express.json());

//routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//listen sv
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
