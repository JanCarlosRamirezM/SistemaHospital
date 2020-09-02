require('dotenv').config({ path: __dirname + '../env' });
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');

const { dbConnection } = require('./database/config');

// DB
dbConnection();

app.use(express.static(__dirname + '/public'));

// Enable Cors
app.use(cors());

// parse application/x-www-form-urlencoded and // parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
app.use('/api/usuarios', require('./routers/usuarios'));
app.use('/api/hospitales', require('./routers/hospitales'));
app.use('/api/medicos', require('./routers/medicos'));
app.use('/api/todo', require('./routers/busquedas'));
app.use('/api/upload', require('./routers/uploads'));
app.use('/api/login', require('./routers/login'));

// Listen APP
app.listen(process.env.NODE_PORT, () => console.log(`SERVER ONLINE!!`, process.env.NODE_PORT));
