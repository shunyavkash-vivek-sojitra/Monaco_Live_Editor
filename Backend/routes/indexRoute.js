const express = require("express");
const router = express.Router();

// Import individual route files
const setMarkdownRoutes = require("./setMarkdownRoute");
const getMarkdownRoutes = require("./getMarkdownRoute");

// Use the routes
router.use("/", setMarkdownRoutes);
router.use("/", getMarkdownRoutes);

module.exports = router;
