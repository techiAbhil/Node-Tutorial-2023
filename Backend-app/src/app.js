const express = require('express');
require('express-async-errors');
const cors = require('cors');
const loggerMiddleware = require('./middlewares/logger-middleware');
const jwtMiddleware = require('./middlewares/jwt-middleware');
const helmet = require('helmet');
var xss = require('xss-clean');

const auth_route = require('./routes/auth-route');
const app_route = require('./routes/app-route');

const server = express();

// server.use(express.json());
server.use([
    cors(),
    express.json(),
    (req, res, next) => {
        console.log('Method = ', req.method, ' URL = ', req.url);
        next();
    },
]);
server.use('/assets', express.static('./assets'));

server.use(helmet());
server.use(xss());
server.use('/api/v1/auth', auth_route);
server.use('/api/v1/app', jwtMiddleware, app_route);

server.use(loggerMiddleware);

server.use('*', (req, res) => {
    res.status(404).json({
        result: 'Page not found 404...!',
        success: false,
    });
});

const PORT = 5050;
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
