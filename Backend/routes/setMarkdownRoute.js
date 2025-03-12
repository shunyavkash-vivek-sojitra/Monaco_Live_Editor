const express = require("express");
const router = express.Router();
const setMarkdown = require("../controllers/setMarkdown");

router.post("/saveMarkdown", setMarkdown);

module.exports = router;
