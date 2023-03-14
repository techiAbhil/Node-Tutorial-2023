/**
 * query params
 * middleware
 * static
 */
const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('test express app!');
});

app.get('/route1', (req, res) => {
	console.log(req.query);
	res.send('test express app! = ' + req.query.name);
});

app.get('/route2/:luckyNo', (req, res) => {
	console.log(req.params);
	res.send('test express app! = ' + req.params.luckyNo);
});

app.use(express.static('public'));
const PORT = 5050;
app.listen(PORT, () =>
	console.log(`App is running at http://localhost:${PORT}`)
);
