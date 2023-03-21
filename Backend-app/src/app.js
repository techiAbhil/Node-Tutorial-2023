const express = require('express');
const cors = require('cors');

const auth_route = require('./routes/auth-route');
const server = express();

// server.use(cors());
// server.use(express.json());

server.use([
	cors(),
	express.json(),
	(req, res, next) => {
		console.log('URL = ', req.url);
		next();
	},
]);

server.use('/api/v1/auth', auth_route);
server.use('*', (req, res) => {
	res.status(404).json({
		result: 'Page not found 404...!',
		success: false,
	});
});

const PORT = 5050;
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
