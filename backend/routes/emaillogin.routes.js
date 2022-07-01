const express = require('express');
const router = express.Router();

const service = require("../service/emaillogin.service");

router.post("/",service.isUserExists);

module.exports = router;