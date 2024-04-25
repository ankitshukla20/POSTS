import { getUserWithUsername, parseToJSON } from "@/lib/firebase";
import { Post, User } from "@/lib/models";
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import PostFeed from "../../components/PostFeed";
import UserDetails from "./UserDetails";

interface Props {
  params: { username: string };
}

interface UserDocument extends DocumentData, User {}

export const revalidate = 3600;

export default async function UserProfilePage({ params: { username } }: Props) {
  const userDoc = await getUserWithUsername(username);

  let user: UserDocument | null = null;
  let posts: Post[] = [];

  if (userDoc) {
    user = userDoc.data() as UserDocument;

    const postsRef = collection(userDoc.ref, "posts");
    const q = query(
      postsRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const postsSnap = await getDocs(q);
    posts = postsSnap.docs.map(parseToJSON);
  }

  return (
    <>
      <UserDetails user={user} />
      <PostFeed posts={posts} />
    </>
  );
}
