import { Post } from "@/lib/models";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface Props {
  post: Post | DocumentData;
}

export default function PostContent({ post }: Props) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>
        Written by <Link href={`/${post.username}`}>@{post.username}</Link>
      </p>
      <ReactMarkdown className="prose dark:prose-invert">
        {post.content}
      </ReactMarkdown>
    </div>
  );
}
