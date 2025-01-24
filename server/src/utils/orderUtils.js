const orderRepository = require('../database/repository/orderRepository') // Adjust the path as needed
const { orderCreatedCounter,orderUpdatedCounter ,orderDeletedCounter} = require('../metrics/orderMetrics'); // Assuming you have a metrics file

 async function createOrder({ customer_name, total_amount, status, product_id } ) {
    try {
        const order = orderRepository.create({
            customer_name,
            total_amount,
            status,
            product_id,
        });
        await orderRepository.save(order);
        orderCreatedCounter.inc();
        return order;
    }
    catch (err) {
        console.error(err);
        throw new Error('Error saving order');
    }
}

async function getOrders(id) {
    try {
        if (id) {
            const order = await orderRepository.findOne({ where: { id } });
            if (!order) {
                throw new Error('Order not found');
            }
            return order;
        }
        const orders = await orderRepository.find();
        return orders;
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching orders');
    }
}

async function deleteOrder(orderId) {
    try {
        const order = await orderRepository.findOne({ where: { id: orderId } });
        if (!order) {
            throw new Error('Order not found');
        }
        await orderRepository.delete(order);
        orderDeletedCounter.inc();
    } catch (err) {
        console.error(err);
        throw new Error('Error deleting order');
    }
}

async function updateOrder(orderId, { customer_name, total_amount, status, product_id }) {
    try {
        const order = await orderRepository.findOne({ where: { id: orderId } });
        if (!order) {
            throw new Error('Order not found');
        }
        order.customer_name = customer_name || order.customer_name;
        order.total_amount = total_amount || order.total_amount;
        order.status = status || order.status;
        order.product_id = product_id || order.product_id;
        await orderRepository.save(order);
        orderUpdatedCounter.inc();
        return order;
    } catch (err) {
        console.error(err);
        throw new Error('Error updating order');
    }
}

module.exports = {
    createOrder,
    getOrders,
    deleteOrder,
    updateOrder,
};