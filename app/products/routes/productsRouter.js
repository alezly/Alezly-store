// import { Product } from "../types/types";
const express = require("express");
const ProductsServices = require('../services/productsServices');
const validatorHandler = require('../../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchemas');

const router = express.Router()
const service = new ProductsServices(); //esto es una instancia

router.get("/", async (req, res) =>{
  const products = await service.find();
  res.json(products);
});

router.get("/:id",
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) =>{
    try {
    const {id} = req.params;
    const product = await service.findOne(id);
    res.json(product);
    } catch(error){
      next(error)
    }
  }
);

router.post("/",
  validatorHandler(createProductSchema, 'body'),
  async (req, res) =>{
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch("/:id",
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) =>{
    try {
      const {id} = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      res.status(404).json({
        message:error.message
      });
    }
  }
);

router.delete("/:id", async (req, res) =>{
  try {
    const {id} = req.params;
    const rest = await service.delete(id);
    res.json(rest);
  } catch (error) {
    res.status(404).json({
      message:error.message
    });
  }
});

module.exports = router;