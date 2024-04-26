"use client";
import PostContent from "@/components/PostContent";
import { firestore } from "@/lib/firebase";
import { Post } from "@/lib/models";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

interface Props {
  postData: any;
  path: string;
}

export default function ContentPage({ postData, path }: Props) {
  const [post, setPost] = useState(postData);

  useEffect(() => {
    const postRef = doc(firestore, path);

    const unsub = onSnapshot(postRef, (snap) => {
      if (snap.exists()) setPost(snap.data());
    });

    return unsub;
  }, []);

  return (
    <>
      <section>
        <PostContent post={post} />
      </section>

      <aside>
        <p>
          <strong>{post.heartCount || 0} ❤️</strong>
        </p>
      </aside>
    </>
  );
}
