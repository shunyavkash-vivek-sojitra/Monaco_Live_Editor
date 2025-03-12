import React, { useState, useEffect } from "react";
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
  const [markdownCode, setMarkdownCode] = useState("# Hello, Markdown!");

  // Store live preview content
  const [previewContent, setPreviewContent] = useState("");

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

  // Live Preview [ effect - on code(values) change ]
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
      const response = await fetch("http://localhost:5000/saveMarkdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markdown: markdownCode }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Markdown saved successfully!");
      } else {
        alert("❌ Error: " + data.error);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("❌ Failed to connect to the server.");
    }
  };

  // Open preview in new tab
  const handlePreviewInNewTab = () => {
    // Open new tab
    const newWindow = window.open("", "_blank");
    // Open document in new tab
    newWindow.document.open();

    // Markdown Preview
    if (language === "markdown") {
      // Write in document in new tab
      newWindow.document.write(`
      <html>
        <head>
          <title>Live Markdown Preview</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            ${document.querySelector("style")?.innerHTML || ""}
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="module">
            import React from "https://esm.sh/react";
            import { createRoot } from "https://esm.sh/react-dom/client";
            import ReactMarkdown from "https://esm.sh/react-markdown";
            import remarkGfm from "https://esm.sh/remark-gfm";
            import remarkEmoji from "https://esm.sh/remark-emoji";

            // convert plain text to string
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
      // HTML, CSS, JS Preview
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

    // done writing in document 
    newWindow.document.close();
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-header">
        <h2>
          Live Code Editor <span className="languageSelected">{language}</span>
        </h2>
        <div className="editor-controls">
          {/* Allow selecting language or markdown */}
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
            {/* Visible "Save" button only when Markdown is selected */}
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
