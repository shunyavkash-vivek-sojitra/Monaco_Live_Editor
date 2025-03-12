import React from "react";
import CodeEditor from "./components/Editor";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="codeEditorWrap">
        <CodeEditor />
      </div>
    </div>
  );
}

export default App;
