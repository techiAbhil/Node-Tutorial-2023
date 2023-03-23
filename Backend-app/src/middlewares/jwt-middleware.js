const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
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
};

module.exports = jwtMiddleware;
