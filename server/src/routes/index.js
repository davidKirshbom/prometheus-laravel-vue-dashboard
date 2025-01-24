const express = require('express');
const router = express.Router();
const { requestCounter } = require('../metrics/httpMetrics');

router.get('/', (req, res) => {
    requestCounter.inc({ method: req.method, route: req.path, status_code: 200 });
    res.send('server is up and running');
});

module.exports = router;