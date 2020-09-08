require('dotenv').config('env');
const express = require('express');
const path = require('path');
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

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Listen APP
app.listen(process.env.PORT || process.env.NODE_PORT, () =>
	console.log(`SERVER ONLINE!!`, process.env.PORT || process.env.NODE_PORT)
);
