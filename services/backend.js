const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.use(express.static('../frontend'))

app.get('/test', (req, res) => {
	console.log('test');
	res.json('hiii');
});

let options = {
	key: fs.readFileSync(path.resolve(__dirname, '../conf/server.key')),
	cert: fs.readFileSync(path.resolve(__dirname, '../conf/server.crt')),
};

const PORT = 8081;
https.createServer(options, app).listen(PORT, function () {
	console.log('Extension Boilerplate service running on https', PORT);
});