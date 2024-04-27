"use client";
import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownToolbar from "./MarkdownToolbar";

export default function EditPostPage() {
  const [markdownText, setMarkdownText] = useState("");
  const textareaRef = useRef(null);

  return (
    <div>
      <MarkdownToolbar
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        textareaRef={textareaRef}
      />

      <textarea
        ref={textareaRef}
        value={markdownText}
        onChange={(event) => {
          setMarkdownText(event.target.value);
        }}
        placeholder="Enter Markdown text here..."
        rows={10}
        cols={100}
        className="
        p-2
        font-mono
        overflow-auto
        whitespace-pre
        border-solid
        border
        border-gray-300
        resize
        w-full
"
      />
      <div>
        <h3>Preview:</h3>
        {/* Render Markdown text as HTML using ReactMarkdown */}
        <div className="prose dark:prose-invert">
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
