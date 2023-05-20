const express = require("express");
const router = express.Router();

const ducksController = require("../controllers/ducks");

router.get("/", ducksController.getAll);

router.post("/new", ducksController.createNew);

module.exports = router;
