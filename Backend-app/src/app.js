const express = require('express');
require('express-async-errors');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const auth_route = require('./routes/auth-route');
const app_route = require('./routes/app-route');

const server = express();

// server.use(express.json());
server.use([
	cors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
	}),
	express.json(),
	(req, res, next) => {
		console.log('Method = ', req.method, ' URL = ', req.url);
		next();
	},
]);

server.use('/api/v1/auth', auth_route);
server.use(
	'/api/v1/app',
	(req, res, next) => {
		try {
			const authorization = req.headers.authorization;
			if (!authorization) {
				throw Error('Access token in missing...!');
			}
			const token = authorization.split('Bearer ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			if (!decoded) {
				throw Error('Access Token verification failed');
			}
			req.user = decoded;
			next();
		} catch (e) {
			res
				.status(401)
				.json({ success: false, resposne: e, msg: 'Unauthorized Access!' });
		}
	},
	app_route
);

server.use((err, req, res, next) => {
	const date = new Date();
	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getFullYear();
	console.log('error log = ', err);
	// create log files date wise
	const fileName = `${day}-${month}-${year}-error-logs.txt`;
	let errormsg = err;
	if (typeof err === 'object') {
		errormsg = JSON.stringify(err);
	} else if (typeof err !== 'string') {
		errormsg = err?.toString();
	}
	fs.appendFile(`./logs/${fileName}`, '\n\n' + errormsg, (error) => {
		console.log('error while writing error logs ');
		console.log(error);
	});
	res.status(500).json({
		success: false,
		msg: 'Internal Server Error...!',
		error: err,
	});
});

server.use('*', (req, res) => {
	res.status(404).json({
		result: 'Page not found 404...!',
		success: false,
	});
});

const PORT = 5050;
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
