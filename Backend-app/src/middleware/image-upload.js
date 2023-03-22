const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './assets');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

		cb(
			null,
			file.fieldname +
				'-' +
				uniqueSuffix +
				'.' +
				file.originalname.split('.').pop()
		);
	},
});

const upload = multer({ storage: storage, limits: { fileSize: 5000000 } });

module.exports = upload;
