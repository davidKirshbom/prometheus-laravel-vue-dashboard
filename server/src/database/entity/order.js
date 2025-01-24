
const { EntitySchema } = require('typeorm');

const Order = new EntitySchema({
  name: 'Order',
  tableName: 'orders',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    customer_name: {
      type: 'varchar',
    },
    total_amount: {
      type: 'float',
    },
    status: {
      type: 'varchar',
    },
    product_id: {
      type: 'varchar',
    },
  },
});

module.exports = Order;