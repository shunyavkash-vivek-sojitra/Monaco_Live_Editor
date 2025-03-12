const Markdown = require("../models/MarkdownModel");

const getMarkdown = async (req, res) => {
  try {
    const fixedId = "markdownDocument"; // Fixed ID

    const markdownEntry = await Markdown.findById(fixedId);

    if (!markdownEntry) {
      return res.status(200).json({ markdown: "# No content available." });
    }

    res.status(200).json({ markdown: markdownEntry.markdown });
  } catch (error) {
    console.error("Error fetching markdown:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getMarkdown;
