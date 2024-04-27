"use client";
import { Button } from "@/components/ui/button";
import { serverTimestamp, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import MarkdownToolbar from "./MarkdownToolbar";

interface Props {
  defaultValues: any;
  postRef: any;
  preview: boolean;
}

export default function PostForm({ defaultValues, postRef, preview }: Props) {
  const [content, setContent] = useState(defaultValues.content || "");
  const [published, setPublished] = useState(defaultValues.published || false);

  const textareaRef = useRef(null);

  useEffect(() => {
    setContent(defaultValues.content || "");
    setPublished(defaultValues.published || false);
  }, [defaultValues]);

  const updatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    toast.success("Post updated successfully!");
  };

  return (
    <div>
      <div className={preview ? "hidden" : "block"}>
        <MarkdownToolbar
          markdownText={content}
          setMarkdownText={setContent}
          textareaRef={textareaRef}
        />
      </div>
      <form onSubmit={updatePost}>
        {preview && (
          <ReactMarkdown className="prose dark:prose-invert">
            {content}
          </ReactMarkdown>
        )}

        <div className={preview ? "hidden" : "block"}>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            ref={textareaRef}
            placeholder="Enter Markdown text here..."
            rows={10}
            cols={100}
            className="p-2 font-mono w-full"
          />

          <fieldset>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <label>Published</label>
          </fieldset>

          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
