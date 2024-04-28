"use client";
import { auth, firestore } from "@/lib/firebase";
import { collection, doc, increment, writeBatch } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { Button } from "./ui/button";
import { useContext, useEffect } from "react";
import { useUserContext } from "@/lib/userContext";
import Link from "next/link";

interface Props {
  path: string;
  postData: any;
}

export default function Heart({ path, postData }: Props) {
  const postRef = doc(firestore, path);
  const heartsRef = collection(postRef, "hearts");
  const heartRef = doc(heartsRef, auth.currentUser?.uid);
  const { username } = useUserContext();

  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    const uid = auth.currentUser?.uid;
    const batch = writeBatch(firestore);

    // Increment heart count
    batch.update(postRef, { heartCount: increment(1) });
    // Set the user's heart document
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  const removeHeart = async () => {
    const batch = writeBatch(firestore);

    // Decrement heart count
    batch.update(postRef, { heartCount: increment(-1) });
    // Delete the user's heart document
    batch.delete(heartRef);

    await batch.commit();
  };

  return (
    <>
      {heartDoc?.exists() ? (
        <Button
          onClick={removeHeart}
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 hover:dark:bg-slate-600 dark:text-slate-200 inline-flex items-center px-4 py-5 transition ease-in-out delay-75 text-md font-semibold rounded-md hover:-translate-y-1 hover:scale-110"
        >
          <path
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
          💔 Unheart
        </Button>
      ) : (
        <Button
          onClick={addHeart}
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 hover:dark:bg-slate-600 dark:text-slate-200 inline-flex items-center px-7 py-5 transition ease-in-out delay-75 text-md font-semibold rounded-md hover:-translate-y-1 hover:scale-110"
        >
          <path
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
          💗 Heart
        </Button>
      )}
      {username === postData?.username && (
        <Link href={`/admin/${postData?.slug}`}>
          <Button className="bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 hover:dark:bg-slate-600 dark:text-slate-200 inline-flex items-center px-12 py-5 transition ease-in-out delay-75 text-md font-semibold rounded-md hover:-translate-y-1 hover:scale-110">
            <path
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
            Edit
          </Button>
        </Link>
      )}
    </>
  );
}
