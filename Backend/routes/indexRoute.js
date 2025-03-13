const express = require("express");
const router = express.Router();

// Import individual route files
const setMarkdownRoutes = require("./setMarkdownRoute");
const getMarkdownRoutes = require("./getMarkdownRoute");

// Use the routes
router.use("/markdown", setMarkdownRoutes);
router.use("/markdown", getMarkdownRoutes);

module.exports = router;
