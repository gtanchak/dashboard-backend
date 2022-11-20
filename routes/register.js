const express = require("express");
const { handleNewuser } = require("../controller/registerController");
const router = express.Router();

router.post("/", handleNewuser);

module.exports = router;
