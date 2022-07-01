const express = require('express');
const router = express.Router();

const service = require("../service/cart.service")

router.get("/:id",service.getCart);
router.post("/",service.saveCart);
router.post("/dec",service.decQty);
router.put("/",service.clearCart);
router.delete("/:userID/:id",service.removeItem);

module.exports = router