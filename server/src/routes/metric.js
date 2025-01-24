
const express = require('express');
const router = express.Router();
const { register } = require('prom-client');
router.get('/', async (req, res) => {
        try {
            res.set('Content-Type', register.contentType);
            res.end(await register.metrics());
        } catch (err) {
            console.error('Error fetching metrics:', err);
            res.status(500).send('Failed to fetch metrics');
        }
    });

    

router.get('/json', async (req, res) => {
    const metrics = await register.getMetricsAsJSON();
    res.json(metrics);
});
module.exports = router;