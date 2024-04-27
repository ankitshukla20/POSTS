"use client";
import { auth, firestore } from "@/lib/firebase";
import { collection, doc } from "firebase/firestore";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PostForm from "./PostForm";
import Toolbox from "./Toolbox";

interface Props {
  params: { slug: string };
}

export default function EditPostPage({ params: { slug } }: Props) {
  const [preview, setPreview] = useState(true);
  const [edit, setEdit] = useState(true);

  const userRef = doc(firestore, "users", auth.currentUser?.uid || "");
  const postsRef = collection(userRef, "posts");
  const postRef = doc(postsRef, slug);

  const [post] = useDocumentData(postRef);

  return (
    <>
      <div className="my-10">
        <Toolbox
          edit={edit}
          setEdit={setEdit}
          preview={preview}
          setPreview={setPreview}
          post={post}
        />
      </div>

      <div className="border bg-slate-200 dark:bg-slate-700 p-5 my-10 mx-auto rounded">
        {post && (
          <section>
            <h1 className="font-semibold text-2xl mb-1">{post.title}</h1>
            <p className="mb-4 font-mono">ID: {post.slug}</p>

            <PostForm
              defaultValues={post}
              preview={preview}
              edit={edit}
              postRef={postRef}
            />
          </section>
        )}
      </div>
    </>
  );
}
