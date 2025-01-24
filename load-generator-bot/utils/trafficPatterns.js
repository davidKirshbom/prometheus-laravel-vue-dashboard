/**
 * Define traffic patterns with request rates (requests per second).
 */
const trafficPatterns = {
    low: 1,     // 1 request per second
    medium: 10, // 10 requests per second
    high: 50,   // 50 requests per second
    random:'random'
};

module.exports = trafficPatterns;