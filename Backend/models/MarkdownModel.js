const mongoose = require("mongoose");

const MarkdownSchema = new mongoose.Schema({
  _id: { type: String, default: "markdownDocument" },
  markdown: { type: String, required: true },
});

module.exports = mongoose.model("Markdown", MarkdownSchema);
