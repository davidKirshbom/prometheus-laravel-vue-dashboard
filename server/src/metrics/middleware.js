const { requestCounter, requestDuration } = require('./httpMetrics');

module.exports = (req, res, next) => {
    const startTime = process.hrtime();

    res.on('finish', () => {
        const durationInSeconds = process.hrtime(startTime)[0] + process.hrtime(startTime)[1] / 1e9;

        requestCounter.inc({
            method: req.method,
            status_code: res.statusCode,
            route: req.route ? req.route.path : req.path,
        });

        requestDuration.observe(
            {
                method: req.method,
                route: req.route ? req.route.path : req.path,
                status_code: res.statusCode,
            },
            durationInSeconds
        );
    });

    next();
};
