// filepath: src/server.js
const express = require('express');
const orderRouter = require('./routes/order');
const metricsRouter = require('./routes/metric');
const routes = require('./routes');

const metricMiddleware = require('./metrics/middleware');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(metricMiddleware);
// Use routes
app.use('/', routes);
app.use('/orders', orderRouter);
app.use('/metrics', metricsRouter);
// Endpoint to expose metrics

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});