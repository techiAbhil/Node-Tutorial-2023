const fs = require('fs');

const loggerMiddleware = (err, req, res, next) => {
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
};

module.exports = loggerMiddleware;
