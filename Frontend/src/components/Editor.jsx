import React, { useState, useEffect } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import "../assets/styles/Editor.css";

const CodeEditor = () => {
  // States the selected language
  const [language, setLanguage] = useState("html");

  // Store individual values of the selected option
  const [htmlCode, setHtmlCode] = useState("<h1>Hello, World!</h1>");
  const [cssCode, setCssCode] = useState(
    "body { background-color: #ebebeb; color: #50383c; }"
  );
  const [jsCode, setJsCode] = useState("console.log('Hello, World!');");
  const [markdownCode, setMarkdownCode] = useState("* No Content Found!");

  // Store live preview content
  const [previewContent, setPreviewContent] = useState("");

  // Fetch Markdown when the component loads
  const fetchMarkdown = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getMarkdown");
      setMarkdownCode(response.data.markdown || "# No content available.");
    } catch (error) {
      console.error("Error fetching markdown:", error);
    }
  };

  useEffect(() => {
    fetchMarkdown();
  }, []);

  // Get code for selected language
  const getCode = () => {
    if (language === "html") return htmlCode;
    if (language === "css") return cssCode;
    if (language === "javascript") return jsCode;
    if (language === "markdown") return markdownCode;
  };

  // Set code for selected language
  const setCode = (value) => {
    if (language === "html") setHtmlCode(value);
    if (language === "css") setCssCode(value);
    if (language === "javascript") setJsCode(value);
    if (language === "markdown") setMarkdownCode(value);
  };

  // Live Preview
  useEffect(() => {
    if (language === "markdown") {
      setPreviewContent(markdownCode);
    } else {
      setPreviewContent(`
        <html>
          <head><style>${cssCode}</style></head>
          <body>${htmlCode}<script>${jsCode}</script></body>
        </html>
      `);
    }
  }, [htmlCode, cssCode, jsCode, markdownCode, language]);

  // Save Markdown Content to Database
  const handleSaveMarkdown = async () => {
    try {
      const response = await axios.post("http://localhost:5000/saveMarkdown", {
        markdown: markdownCode,
      });

      if (response.status === 200) {
        alert("✅ Markdown saved successfully!");
      } else {
        alert("❌ Error: " + response.data.error);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("❌ Failed to connect to the server.");
    }
  };

  // Open preview in new tab
  const handlePreviewInNewTab = () => {
    const newWindow = window.open("", "_blank");
    newWindow.document.open();

    if (language === "markdown") {
      newWindow.document.write(`
      <html>
        <head>
          <title>Live Markdown Preview</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <div id="root"></div>
          <script type="module">
            import React from "https://esm.sh/react";
            import { createRoot } from "https://esm.sh/react-dom/client";
            import ReactMarkdown from "https://esm.sh/react-markdown";
            import remarkGfm from "https://esm.sh/remark-gfm";
            import remarkEmoji from "https://esm.sh/remark-emoji";

            const markdownContent = ${JSON.stringify(markdownCode)};

            const App = () => (
              React.createElement("div", { className: "markdown-preview" },
                React.createElement(ReactMarkdown, { children: markdownContent, remarkPlugins: [remarkGfm, remarkEmoji] })
              )
            );

            createRoot(document.getElementById("root")).render(React.createElement(App));
          </script>
        </body>
      </html>
    `);
    } else {
      newWindow.document.write(`
      <html>
        <head>
          <title>Live Preview</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `);
    }

    newWindow.document.close();
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-header">
        <h2>
          Live Code Editor <span className="languageSelected">{language}</span>
        </h2>
        <div className="editor-controls">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="markdown">Markdown</option>
          </select>
          <button className="preview-btn" onClick={handlePreviewInNewTab}>
            Preview in New Tab
          </button>
        </div>
      </div>

      {/* Monaco Code Editor */}
      <Editor
        height="400px"
        language={language === "markdown" ? "markdown" : language}
        theme="vs-dark"
        value={getCode()}
        onChange={(value) => setCode(value)}
        options={{ fontSize: 16, minimap: { enabled: true } }}
      />

      {/* Markdown Preview */}
      <div className="preview-container">
        <div className="preview-header-wrap">
          <div className="preview-header">
            <h3>Live Preview</h3>
            {language === "markdown" && (
              <button className="save-btn" onClick={handleSaveMarkdown}>
                Save
              </button>
            )}
          </div>
        </div>

        {language === "markdown" ? (
          <div className="markdown-preview">
            <ReactMarkdown
              children={previewContent}
              remarkPlugins={[remarkGfm, remarkEmoji]}
            />
          </div>
        ) : (
          <iframe
            title="Live Preview"
            srcDoc={previewContent}
            className="preview-frame"
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
