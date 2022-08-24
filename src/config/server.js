const express = require('express');
const ordersRouter = require('../routes/order');
const app = express();

const startServer = () => {
  app.use(express.json())
  app.use('/orders', ordersRouter);

  return app
}

module.exports = startServer