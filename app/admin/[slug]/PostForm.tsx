"use client";
import { Button } from "@/components/ui/button";
import { serverTimestamp, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import MarkdownToolbar from "./MarkdownToolbar";
import { Checkbox } from "@/components/ui/checkbox";

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
        <div className="lg:grid lg:grid-cols-2 gap-2">
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
                className="mt-4 font-mono appearance-none block w-full bg-slate-50 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-slate-700 dark:focus:border-1 dark:focus:border-slate-600 dark:focus:bg-slate-800 dark:text-slate-300"
                rows={20}
              />
            </div>
          )}

          {preview && (
            <div className={edit ? "col-span-1" : "col-span-2"}>
              <div className="mt-4 bg-white text-gray-700 border border-slate-100 rounded py-3 px-4 mb-3 leading-tight  dark:bg-slate-800 dark:border-none dark:text-slate-300">
                <ReactMarkdown className="prose dark:prose-invert">
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        <fieldset className="flex items-center mb-8 mt-3 hover:cursor-pointer">
          <input
            id="published"
            className="hover:cursor-pointer relative peer shrink-0 appearance-none w-4 h-4 border border-slate-500 rounded-sm bg-white checked:bg-violet-500 checked:border-0"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published">
            <span className="pl-3 hover:cursor-pointer select-none">
              {published ? "Published" : "Not Published (Click to publish)"}
            </span>
          </label>
        </fieldset>

        <Button
          variant="outline"
          type="submit"
          className="mb-3 cursor-pointer uppercase bg-white dark:bg-slate-800 px-4 py-2 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#f43f5e,-0.5rem_-0.5rem_#a855f7] dark:hover:shadow-[0.5rem_0.5rem_#e11d48,-0.5rem_-0.5rem_#9333ea] transition"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}
