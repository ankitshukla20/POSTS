"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { firestore } from "@/lib/firebase";
import { useUserContext } from "@/lib/userContext";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import debounce from "lodash.debounce";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import UsernameMessage from "./UsernameMessage";

export default function UsernameForm() {
  const [formVal, setFormVal] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // changing form value
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length <= 3) {
      setFormVal(val);
      setIsLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormVal(val);
      setIsLoading(true);
      setIsValid(false);
    }
  };

  // checking if form value is valid
  useEffect(() => {
    checkUsername(formVal);
  }, [formVal]);

  // debouncing the function which is checking if username is available and valid or not
  const checkUsername = useCallback(
    debounce(async (formVal) => {
      if (formVal.length > 3) {
        const docRef = doc(firestore, `usernames/${formVal}`);
        const docSnap = await getDoc(docRef);

        console.log("Firestore read executed!");

        const exists = docSnap.exists();

        if (exists) {
          setIsValid(false);
        } else {
          setIsValid(true);
        }

        setIsLoading(false);
      }
    }, 500),
    []
  );

  // Submitting the form
  const { user, username } = useUserContext();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create refs for both documents
    const userDocRef = doc(firestore, `users/${user?.uid}`);
    const usernameDocRef = doc(firestore, `usernames/${formVal}`);

    // Commit both docs together as a batch write
    const batch = writeBatch(firestore);

    batch.set(userDocRef, {
      username: formVal,
      photoUrl: user?.photoURL,
      displayName: user?.displayName,
    });
    batch.set(usernameDocRef, { uid: user?.uid });

    await batch.commit();
  };

  return (
    <section>
      <h1 className="font-semibold mb-4">Select Username</h1>
      <form onSubmit={onSubmit} className="flex items-center gap-3 mb-2">
        <Input
          className="w-48"
          type="text"
          placeholder="Username"
          value={formVal}
          onChange={onChange}
        />
        <Button type="submit" disabled={!isValid}>
          Select
        </Button>
      </form>
      <UsernameMessage
        username={formVal}
        isValid={isValid}
        isLoading={isLoading}
      />

      <h3 className="font-semibold mt-6 mb-1">Debug State</h3>
      <div>
        Username: {formVal}
        <br />
        Loading: {isLoading.toString()}
        <br />
        Username Valid: {isValid.toString()}
      </div>
    </section>
  );
}
