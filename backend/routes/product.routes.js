const express = require('express');

const productService = require("../service/product.service")

const router = express.Router();

router.get("/:products",productService.getProducts);


module.exports = router