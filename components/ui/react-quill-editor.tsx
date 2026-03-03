"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ReactQuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ReactQuillEditor: React.FC<ReactQuillEditorProps> = ({
  value,
  onChange,
  placeholder = "Start typing...",
  className = "",
}) => {

  // Configure Quill modules for full functionality
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: false,
    },
  };

  // Configure Quill formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "size",
    "color",
    "background",
    "font",
    "align",
    "link",
    "image",
    "video",
  ];

  // Handle text change
  const handleChange = (content: string) => {
    onChange(content);
  };

  // Custom styles for Quill editor
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .ql-editor {
        min-height: 200px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        line-height: 1.6;
      }
      
      .ql-toolbar {
        border-top: 1px solid #e5e7eb;
        border-left: 1px solid #e5e7eb;
        border-right: 1px solid #e5e7eb;
        border-bottom: none;
        border-radius: 0.375rem 0.375rem 0 0;
        background-color: #f9fafb;
      }
      
      .ql-container {
        border-top: 1px solid #e5e7eb;
        border-left: 1px solid #e5e7eb;
        border-right: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
        border-radius: 0 0 0.375rem 0.375rem;
      }
      
      .ql-toolbar .ql-stroke {
        stroke: #6b7280;
      }
      
      .ql-toolbar .ql-fill {
        fill: #6b7280;
      }
      
      .ql-toolbar .ql-picker {
        color: #6b7280;
      }
      
      .ql-toolbar .ql-picker-label:hover,
      .ql-toolbar .ql-picker-label.ql-active,
      .ql-toolbar .ql-picker-item:hover,
      .ql-toolbar .ql-picker-item.ql-selected {
        color: #2563eb;
      }
      
      .ql-toolbar .ql-picker-options {
        background-color: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.375rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }
      
      .ql-toolbar button:hover,
      .ql-toolbar button.ql-active {
        color: #2563eb;
      }
      
      .ql-toolbar button:hover .ql-stroke,
      .ql-toolbar button.ql-active .ql-stroke {
        stroke: #2563eb;
      }
      
      .ql-toolbar button:hover .ql-fill,
      .ql-toolbar button.ql-active .ql-fill {
        fill: #2563eb;
      }
      
      .ql-editor.ql-blank::before {
        color: #9ca3af;
        font-style: normal;
      }
      
      .ql-editor h1 {
        font-size: 2.25rem;
        font-weight: 700;
        line-height: 2.5rem;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        color: #111827;
      }
      
      .ql-editor h2 {
        font-size: 1.875rem;
        font-weight: 600;
        line-height: 2.25rem;
        margin-top: 1.25rem;
        margin-bottom: 0.75rem;
        color: #111827;
      }
      
      .ql-editor h3 {
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 2rem;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        color: #111827;
      }
      
      .ql-editor p {
        margin-bottom: 1rem;
        color: #374151;
      }
      
      .ql-editor ul,
      .ql-editor ol {
        margin-bottom: 1rem;
        padding-left: 1.5rem;
        color: #374151;
      }
      
      .ql-editor li {
        margin-bottom: 0.25rem;
      }
      
      .ql-editor blockquote {
        border-left: 4px solid #2563eb;
        padding-left: 1rem;
        margin: 1rem 0;
        color: #6b7280;
        font-style: italic;
      }
      
      .ql-editor code {
        background-color: #f3f4f6;
        padding: 0.125rem 0.25rem;
        border-radius: 0.25rem;
        font-family: 'Courier New', monospace;
        font-size: 0.875rem;
        color: #1f2937;
      }
      
      .ql-editor pre {
        background-color: #1f2937;
        color: #f9fafb;
        padding: 1rem;
        border-radius: 0.375rem;
        overflow-x: auto;
        margin: 1rem 0;
      }
      
      .ql-editor pre code {
        background-color: transparent;
        padding: 0;
        color: inherit;
      }
      
      .ql-editor a {
        color: #2563eb;
        text-decoration: underline;
      }
      
      .ql-editor a:hover {
        color: #1d4ed8;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className={`react-quill-editor ${className}`}>
      {typeof window !== 'undefined' && (
        <ReactQuill
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          theme="snow"
        />
      )}
    </div>
  );
};

export default ReactQuillEditor;
