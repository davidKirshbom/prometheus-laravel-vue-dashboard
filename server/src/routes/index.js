// filepath: src/routes/index.js
const express = require('express');
const router = express.Router();
const { httpRequestCounter } = require('../metrics/defaultMetrics');

router.get('/', (req, res) => {
    httpRequestCounter.inc({ method: req.method, route: req.path, status_code: 200 });
    res.send('Hello World!');
});

module.exports = router;