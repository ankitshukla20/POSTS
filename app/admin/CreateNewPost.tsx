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
    <>
      <h1 className="text-2xl font-semibold my-3">Create New Post</h1>
      <form onSubmit={createPost}>
        <Input
          className="text-xl p-6"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="my-2">
          <strong>Slug:</strong> {slug}
        </p>
        <Button
          type="submit"
          disabled={!isValid}
          className="bg-green-600 hover:bg-green-700 text-lg px-5 py-5"
        >
          Create
        </Button>
      </form>
    </>
  );
}
