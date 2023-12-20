const express = require('express');

const productsRouter = require('./products/routes/productsRouter')
// const productsRouter = require('./routes/productsRouter')


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  // app.use('/products', productsRouter);
}
module.exports = routerApi;
