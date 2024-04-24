import { Timestamp } from "firebase/firestore";

export interface Post {
  title: string;
  slug: string;
  uid: string;
  username: string;
  published: boolean;
  content: string;
  createdAt: number;
  updatedAt: number;
  heartCount: number;
}

export interface User {
  username: string;
  photoUrl: string;
  displayName: string;
}
