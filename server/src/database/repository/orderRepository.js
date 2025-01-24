const AppDataSource = require('../config');
const Order = require('../entity/order');

module.exports = AppDataSource.getRepository(Order);