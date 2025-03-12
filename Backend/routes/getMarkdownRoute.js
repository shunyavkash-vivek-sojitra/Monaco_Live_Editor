const express = require("express");
const router = express.Router();
const getMarkdown = require("../controllers/getMarkdown");

router.get("/getMarkdown", getMarkdown);

module.exports = router;
