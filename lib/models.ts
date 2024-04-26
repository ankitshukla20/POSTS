import { Timestamp } from "firebase/firestore";

export interface Post {
  title: string;
  slug: string;
  uid: string;
  username: string;
  published: boolean;
  content: string;
  createdAt: number | Timestamp;
  updatedAt: number | Timestamp;
  heartCount: number;
}

export interface User {
  username: string;
  photoUrl: string;
  displayName: string;
}
