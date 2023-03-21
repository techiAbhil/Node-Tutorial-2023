require('express-async-errors');
const cors = require('cors');
const authRoutes = require('./router/auth-routes');
const express = require('express');
const server = express();

const PORT = 5050;

const logger = (req, res, next) => {
	console.log('Request url = ', req.url);
	next();
};

server.use([express.json(), cors(), logger]);

server.use('/api/v1/auth', authRoutes);

server.use('*', (req, res) => {
	res.status(404).send({
		response: '404 Page Not Found...!',
	});
});

server.listen(PORT, () =>
	console.log(`Server is listening at http://localhost:${PORT}`)
);
