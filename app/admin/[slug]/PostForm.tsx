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
  edit: boolean;
}

export default function PostForm({
  defaultValues,
  postRef,
  preview,
  edit,
}: Props) {
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
      {edit && (
        <MarkdownToolbar
          markdownText={content}
          setMarkdownText={setContent}
          textareaRef={textareaRef}
        />
      )}

      <form onSubmit={updatePost}>
        <div className="grid lg:grid-cols-2 gap-2">
          {edit && (
            <div className={preview ? "col-span-1" : "col-span-2"}>
              <textarea
                required
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                ref={textareaRef}
                placeholder={`Enter Markdown text here... \n\n(Tip: Click all the buttons in the toolbar to get comfortable.)`}
                className="mt-4 font-mono appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-slate-800 dark:border-slate-800 dark:focus:bg-slate-950 dark:text-slate-300"
                rows={20}
              />
            </div>
          )}

          {preview && (
            <div className={edit ? "col-span-1" : "col-span-2"}>
              <div className="mt-4 bg-white text-gray-700 border border-slate-100 rounded py-3 px-4 mb-3 leading-tight  dark:bg-slate-900 dark:border-slate-800  dark:text-slate-300">
                <ReactMarkdown className="prose dark:prose-invert">
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        <fieldset>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label>Published</label>
        </fieldset>

        <Button variant="outline" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
