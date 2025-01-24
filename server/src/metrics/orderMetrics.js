const { Counter } = require("prom-client");

const orderCreatedCounter = new Counter({
    name: 'orders_created_total',
    help: 'Total number of orders created',
});
const orderUpdatedCounter = new Counter({
    name: 'orders_updated_total',
    help: 'Total number of orders updated',
});

const orderDeletedCounter = new Counter({
    name: 'orders_deleted_total',
    help: 'Total number of orders deleted',
});

module.exports = {
    orderCreatedCounter,
    orderUpdatedCounter,
    orderDeletedCounter,
};