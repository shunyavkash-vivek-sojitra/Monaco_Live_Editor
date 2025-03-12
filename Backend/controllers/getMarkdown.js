const Markdown = require("../models/MarkdownModel");

const getMarkdown = async (req, res) => {
  try {
    const markdownId = "67d1799e3ef47ed55cfd5849";
    let markdownData = await Markdown.findById(markdownId);

    if (!markdownData) {
      // If no data exists, create a new one
      markdownData = await Markdown.create({
        _id: markdownId,
        content: "# Welcome to Live Editor!",
      });
    }

    res.json({ markdown: markdownData.content });
  } catch (error) {
    console.error("Error retrieving Markdown:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getMarkdown;
