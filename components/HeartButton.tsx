"use client";
import { auth, firestore } from "@/lib/firebase";
import { collection, doc, increment, writeBatch } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

interface Props {
  path: string;
}

export default function Heart({ path }: Props) {
  const postRef = doc(firestore, path);
  const heartsRef = collection(postRef, "hearts");
  const heartRef = doc(heartsRef, auth.currentUser?.uid);

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
        <button onClick={removeHeart}>💔 Unheart</button>
      ) : (
        <button onClick={addHeart}>💗 Heart</button>
      )}
    </>
  );
}
