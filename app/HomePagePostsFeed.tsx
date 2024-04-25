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
      <PostFeed posts={posts} />

      <div className="flex justify-center mt-3">
        <div className="w-11/12 md:w-7/8 lg:w-2/3">
          {isFetching && (
            <div className="w-full gap-x-2 flex justify-center items-center">
              <div className="w-5 bg-pink-600 animate-pulse h-5 rounded-full "></div>
              <div className="w-5 animate-pulse h-5 bg-purple-600 rounded-full "></div>
              <div className="w-5 h-5 animate-pulse bg-violet-600 rounded-full "></div>
            </div>
          )}

          {postsEnd && (
            <p className="text-slate-500">You have reached the end!</p>
          )}

          {!isFetching && !postsEnd && (
            <Button onClick={fetchPosts}>Load more</Button>
          )}
        </div>
      </div>
    </>
  );
}
