const express = require("express");
const { createUser } = require("../controllers/register");

const router = express.Router();

router.post("/", createUser);

module.exports = router;
