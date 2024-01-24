const express = require("express");
const router = express.Router();
const {serverStatus} = require("../controllers/statusController");

router.get('/healthcheck', serverStatus);

module.exports = router