"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, firestore } from "@/lib/firebase";
import { useUserContext } from "@/lib/userContext";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import kebabCase from "lodash.kebabcase";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function CreateNewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const { username } = useUserContext();

  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const uid = auth.currentUser?.uid;
    const postRef = doc(firestore, `users/${uid}/posts/${slug}`);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# Hello World!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await setDoc(postRef, data);

    toast.success("Post Created!");
    router.push(`/admin/${slug}`);
  };

  return (
    <div className="mt-10 px-4 pt-4 pb-6 mb-10 rounded-2xl border bg-slate-100 dark:bg-slate-900">
      <h1 className="text-2xl font-semibold pl-1 mb-3">Create New Post</h1>
      <p className="p-1 mb-2 font-mono">
        <strong>slug: </strong>
        {slug}
      </p>
      <form
        onSubmit={createPost}
        className="flex flex-col md:flex-row md:items-center gap-5"
      >
        <input
          className="outline-slate-300 dark:outline-none dark:focus:bg-slate-700 py-3 px-4 block w-full border-gray-200 rounded-xl text-md disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-800 dark:border-neutral-700 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:ring-neutral-600"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          type="submit"
          disabled={!isValid}
          className="self-start h-12 inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-xl cursor-pointer bg-green-600 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md hover:scale-110 hover:rotate-2 hover:bg-green-500 hover:shadow-lg active:opacity-85"
        >
          Create
        </Button>
      </form>
    </div>
  );
}
