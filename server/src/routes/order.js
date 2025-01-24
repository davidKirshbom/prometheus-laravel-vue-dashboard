const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrder, deleteOrder } = require('../utils/orderUtils');
const e = require('express');

router.post('/', async (req, res) => {
    const { customer_name, total_amount, status, product_id } = req.body;
    if (!customer_name || !total_amount || !status || !product_id) {
      res.status(400).send('Missing required fields');
      return;
    }
    try {
      const newOrder = await createOrder(req.body);
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Read Orders (GET /orders)
  router.get('/', async (req, res) => {
    try {
      const orders = await getOrders();
      res.json(orders);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Read Order by ID (GET /orders/:id)
  router.get('/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
      const order = await getOrders(orderId);
      if (!order) {
        res.status(404).send('Order not found');
        return;
      }
      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching order');
    }
  });
  
  // Update Order (PUT /orders/:id)
  router.put('/:id', async (req, res) => {
    const orderId = req.params.id;
  
    try {
      const order = await updateOrder(orderId, req.body);
  
      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });
  
  // Delete Order (DELETE /orders/:id)
  router.delete('/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
      const order = await deleteOrder(orderId);
  
      if (!order) {
        res.status(404).send('Order not found');
        return;
      }
      res.status(204).send('Order deleted');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting order');
    }
  });
  
    module.exports = router;