"use client";
import PostFeed from "@/components/PostFeed";
import { Button } from "@/components/ui/button";
import { firestore, fromMillis, parseToJSON } from "@/lib/firebase";
import { Post } from "@/lib/models";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useState } from "react";

interface Props {
  initialPosts: Post[];
  LIMIT: number;
}

export default function HomePagePostsFeed({ initialPosts, LIMIT }: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const [isFetching, setIsFetching] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const fetchPosts = async () => {
    setIsFetching(true);

    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const q = query(
      collectionGroup(firestore, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );

    const querySnap = await getDocs(q);

    const newPosts = querySnap.docs.map((doc) => parseToJSON(doc));

    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setIsFetching(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <>
      <div className="mt-10" />
      <PostFeed posts={posts} />

      <div className="flex justify-center mt-2">
        <div className="w-11/12">
          {isFetching && (
            <div className="w-full gap-x-2 flex items-center mx-7 my-2">
              <div className="w-4 h-4 animate-pulse bg-pink-600 rounded-full "></div>
              <div className="w-4 h-4 animate-pulse  bg-purple-600 rounded-full "></div>
              <div className="w-4 h-4 animate-pulse bg-violet-600 rounded-full "></div>
            </div>
          )}

          {postsEnd && (
            <p className="text-slate-500 mx-3">You have reached the end!</p>
          )}

          {!isFetching && !postsEnd && (
            <Button
              onClick={fetchPosts}
              className="px-5 py-4 dark:bg-slate-800 dark:text-slate-50 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            >
              Load more
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
