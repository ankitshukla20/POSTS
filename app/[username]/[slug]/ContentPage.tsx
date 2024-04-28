"use client";
import AuthCheck from "@/components/AuthCheck";
import HeartButton from "@/components/HeartButton";
import PostContent from "@/components/PostContent";
import { Button } from "@/components/ui/button";
import { firestore } from "@/lib/firebase";
import { useUserContext } from "@/lib/userContext";
import { doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";

interface Props {
  postData: any;
  path: string;
}

export default function ContentPage({ postData, path }: Props) {
  const [post, setPost] = useState(postData);
  const { username } = useUserContext();

  useEffect(() => {
    const postRef = doc(firestore, path);

    const unsub = onSnapshot(postRef, (snap) => {
      if (snap.exists()) setPost(snap.data());
    });

    return unsub;
  }, []);

  return (
    <div className="mb-20 mt-10 md:grid md:grid-cols-4 md:gap-6">
      <section className=" col-span-3 border bg-slate-50 dark:bg-slate-900 p-5 rounded-lg mb-10">
        <PostContent post={post} />
      </section>

      <aside className="w-8/12 sm:w-1/3 md:w-full self-start sticky top-10 col-span-1">
        <div
          className={`flex flex-col gap-8 items-center border bg-slate-50 dark:bg-slate-900 p-5 pt-10 rounded-lg h-52 ${
            username === postData?.username ? "h-64" : "h-52"
          }`}
        >
          <p className="text-xl flex items-center gap-2">
            <strong>{post.heartCount || 0}</strong>
            <IoHeartSharp className="text-red-500" />
          </p>
          <AuthCheck
            fallback={
              <Link href="/enter">
                <Button className="bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 hover:dark:bg-slate-600 dark:text-slate-200 inline-flex items-center px-4 py-5 transition ease-in-out delay-75 text-md font-semibold rounded-md hover:-translate-y-1 hover:scale-110">
                  <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    stroke-width="2"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  ></path>
                  💗 Sign Up
                </Button>
              </Link>
            }
          >
            <HeartButton postData={postData} path={path} />
          </AuthCheck>
        </div>
      </aside>
    </div>
  );
}
