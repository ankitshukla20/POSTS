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
  const [preview, setPreview] = useState(false);

  const userRef = doc(firestore, "users", auth.currentUser?.uid || "");
  const postsRef = collection(userRef, "posts");
  const postRef = doc(postsRef, slug);

  const [post] = useDocumentData(postRef);

  return (
    <div>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              defaultValues={post}
              preview={preview}
              postRef={postRef}
            />
          </section>

          <aside>
            <h3>Tools</h3>
            <Toolbox preview={preview} setPreview={setPreview} post={post} />
          </aside>
        </>
      )}
    </div>
  );
}
