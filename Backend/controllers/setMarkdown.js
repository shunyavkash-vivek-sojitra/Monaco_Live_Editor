const Markdown = require("../models/MarkdownModel");

const setMarkdown = async (req, res) => {
  try {
    const markdownId = "67d1799e3ef47ed55cfd5849";
    const { markdown } = req.body;

    const updatedMarkdown = await Markdown.findByIdAndUpdate(
      markdownId,
      { content: markdown },
      { new: true, upsert: true }
    );

    res.json({ success: true, markdown: updatedMarkdown.content });
  } catch (error) {
    console.error("Error saving Markdown:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = setMarkdown;
