const schemaMiddleware = (schema) => {
	return async (req, res, next) => {
		try {
			await schema.validate(req.body);
			next();
		} catch (e) {
			res.status(400).json({
				msg: 'Bad Request...!',
				success: false,
				error: e,
			});
		}
	};
};

module.exports = schemaMiddleware;
