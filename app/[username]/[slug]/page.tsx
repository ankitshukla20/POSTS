import { getUserWithUsername, parseToJSON } from "@/lib/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import ContentPage from "./ContentPage";

interface Props {
  params: { username: string; slug: string };
}

export default async function PostPage({ params: { username, slug } }: Props) {
  const userDoc = await getUserWithUsername(username);

  let post = null;
  let path = "";
  let postRef;

  if (userDoc) {
    const postsRef = collection(userDoc.ref, "posts");
    postRef = doc(postsRef, slug);

    const postSnap = await getDoc(postRef);
    post = parseToJSON(postSnap);
    path = postSnap.ref.path;
  }

  return (
    <>
      <ContentPage postData={post} path={path} />
    </>
  );
}
