const express = require('express');
const app = express();
const router = require('./router');

app.use(router);
app.use('*', (req, res) => {
	res.send('<h1 style="color:red">Page Not Found 404</h1>');
});

const PORT = 5050;
app.listen(PORT, () =>
	console.log(`server is listening at http://localhost:${PORT}`)
);
