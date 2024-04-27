"use client";
import PostFeed from "@/components/PostFeed";
import { Separator } from "@/components/ui/separator";
import { auth, firestore } from "@/lib/firebase";
import { Post } from "@/lib/models";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default function PostList() {
  const userRef = doc(firestore, "users", auth.currentUser?.uid || "");
  const userPostsRef = collection(userRef, "posts");
  const q = query(userPostsRef, orderBy("createdAt", "desc"));

  const [querySnapshot] = useCollection(q);

  let posts = [] as Post[];
  if (querySnapshot) {
    posts = querySnapshot.docs.map((doc) => doc.data()) as Post[];
  }

  return (
    <>
      {posts.length > 0 && (
        <div className="border bg-slate-50 dark:bg-slate-900 pt-5 pb-2 mb-20 rounded-lg">
          <div className="flex justify-center">
            <h1 className="w-11/12 px-3 mt-2 mb-4 text-3xl font-medium">
              Manage Your Posts
            </h1>
          </div>
          <Separator className="w-11/12 mx-12" />
          <PostFeed posts={posts} admin />
        </div>
      )}
    </>
  );
}
