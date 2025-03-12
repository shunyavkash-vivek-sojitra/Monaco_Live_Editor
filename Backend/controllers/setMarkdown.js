const Markdown = require("../models/MarkdownModel");

const setMarkdown = async (req, res) => {
  try {
    const { markdown } = req.body;
    const fixedId = "markdownDocument"; // Fixed ID for the markdown entry

    // Find and update the markdown document or create a new one
    const updatedMarkdown = await Markdown.findOneAndUpdate(
      { _id: fixedId },
      { markdown },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, markdown: updatedMarkdown.markdown });
  } catch (error) {
    console.error("Error saving markdown:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = setMarkdown;
