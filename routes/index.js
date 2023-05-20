const express = require("express");
const router = express.Router();
router.use("/ducks", require("./ducks"));

module.exports = router;
