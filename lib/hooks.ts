import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let unsub;

    if (user) {
      const userDocRef = doc(firestore, "users", user.uid);

      unsub = onSnapshot(userDocRef, (doc) => {
        setUsername(doc.data()?.username || null);
      });
    } else {
      setUsername(null);
    }

    return unsub;
  }, [user]);

  return { user, username };
}
