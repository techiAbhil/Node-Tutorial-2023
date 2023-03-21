const express = require('express');

const router = express.Router();

router.get('/users', (req, res) => {
	res.send('You have hit users router');
});

module.exports = router;
