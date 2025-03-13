import{r as a,j as e,F as E,M as S,c as M}from"./react-vendor-5EEkY-MT.js";import{e as L,p as P,f as c,g as v}from"./vendor-D8Tzp1pi.js";import"./monaco-editor-CnlfAxTC.js";(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))m(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&m(n)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function m(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}})();const z=()=>{const[o,d]=a.useState("html"),[i,m]=a.useState("<h1>Hello, World!</h1>"),[r,s]=a.useState("body { background-color: #ebebeb; color: #50383c; }"),[n,k]=a.useState("console.log('Hello, World!');"),[l,h]=a.useState("# Loading..."),[u,w]=a.useState(""),g=async()=>{try{const t=await v.get("https://monaco-live-editor.onrender.com/api/markdown/getMarkdown");h(t.data.markdown||"# No content available.")}catch(t){console.error("Error fetching markdown:",t)}};a.useEffect(()=>{g()},[]);const y=()=>{if(o==="html")return i;if(o==="css")return r;if(o==="javascript")return n;if(o==="markdown")return l},j=t=>{o==="html"&&m(t),o==="css"&&s(t),o==="javascript"&&k(t),o==="markdown"&&h(t)};a.useEffect(()=>{w(o==="markdown"?l:`
        <html>
          <head><style>${r}</style></head>
          <body>${i}<script>${n}<\/script></body>
        </html>
      `)},[i,r,n,l,o]);const x=async()=>{try{const t=await v.post("https://monaco-live-editor.onrender.com/api/markdown/saveMarkdown",{markdown:l});t.status===200?alert("✅ Markdown saved successfully!"):alert("❌ Error: "+t.data.error)}catch{alert("❌ Failed to connect to the server.")}},b=()=>{var f;const t=window.open("","_blank");if(t.document.open(),o==="markdown"){const p=c.sanitize(l);t.document.write(`
      <html>
        <head>
          <title>Live Markdown Preview</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            ${((f=document.querySelector("style"))==null?void 0:f.innerHTML)||""}
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

            const markdownContent = ${JSON.stringify(p)};

            const App = () => (
              React.createElement("div", { className: "markdown-preview" },
                React.createElement(ReactMarkdown, { children: markdownContent, remarkPlugins: [remarkGfm, remarkEmoji] })
              )
            );

            createRoot(document.getElementById("root")).render(React.createElement(App));
          <\/script>
        </body>
      </html>
    `)}else{const p=c.sanitize(i),C=c.sanitize(r),N=c.sanitize(n);t.document.write(`
      <html>
        <head>
          <title>Live Preview</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>${C}</style>
        </head>
        <body>
          ${p}
          <script>${N}<\/script>
        </body>
      </html>
    `)}t.document.close()};return e.jsxs("div",{className:"editor-wrapper",children:[e.jsxs("div",{className:"editor-header",children:[e.jsxs("h2",{children:["Live Code Editor ",e.jsx("span",{className:"languageSelected",children:o})]}),e.jsxs("div",{className:"editor-controls",children:[e.jsxs("select",{value:o,onChange:t=>d(t.target.value),children:[e.jsx("option",{value:"html",children:"HTML"}),e.jsx("option",{value:"css",children:"CSS"}),e.jsx("option",{value:"javascript",children:"JavaScript"}),e.jsx("option",{value:"markdown",children:"Markdown"})]}),e.jsx("button",{className:"preview-btn",onClick:b,children:"Preview in New Tab"})]})]}),e.jsx(E,{height:"400px",language:o==="markdown"?"markdown":o,theme:"vs-dark",value:y(),onChange:t=>j(t),options:{fontSize:16,minimap:{enabled:!0}}}),e.jsxs("div",{className:"preview-container",children:[e.jsx("div",{className:"preview-header-wrap",children:e.jsxs("div",{className:"preview-header",children:[e.jsx("h3",{children:"Live Preview"}),o==="markdown"&&e.jsx("button",{className:"save-btn",onClick:x,children:"Save"})]})}),o==="markdown"?e.jsx("div",{className:"markdown-preview",children:e.jsx(S,{children:c.sanitize(u),remarkPlugins:[L,P]})}):e.jsx("iframe",{title:"Live Preview",srcDoc:c.sanitize(u,{ADD_TAGS:["script"]}),className:"preview-frame"})]})]})};function R(){return e.jsx("div",{className:"app",children:e.jsx("div",{className:"codeEditorWrap",children:e.jsx(z,{})})})}M.createRoot(document.getElementById("root")).render(e.jsx(R,{}));
