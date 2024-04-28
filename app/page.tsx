import { firestore, parseToJSON } from "@/lib/firebase";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import HomePagePostsFeed from "./HomePagePostsFeed";

const LIMIT = 15;

export const dynamic = "force-dynamic";

export default async function Home() {
  const q = query(
    collectionGroup(firestore, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );

  const querySnap = await getDocs(q);

  const initialPosts = querySnap.docs.map((doc) => parseToJSON(doc));

  return <HomePagePostsFeed initialPosts={initialPosts} LIMIT={LIMIT} />;
}
