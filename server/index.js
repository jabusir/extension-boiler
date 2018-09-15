const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});
// app.use(express.static('../frontend'))

// Routes
const spotify = require('./routes/spotify');
app.use('/spotify', spotify );

const options = {
	key: fs.readFileSync(path.resolve(__dirname, '../conf/server.key')),
	cert: fs.readFileSync(path.resolve(__dirname, '../conf/server.crt')),
};

const PORT = 8081;
https.createServer(options, app).listen(PORT, function () {
	console.log(`Server listening on port ${PORT}`);
});
