import { Post } from "@/lib/models";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Separator } from "./ui/separator";

interface Props {
  post: Post | DocumentData;
}

export default function PostContent({ post }: Props) {
  return (
    <>
      <h1 className="text-5xl my-3">{post.title}</h1>
      <p className="mb-2">
        Written by{" "}
        <Link
          href={`/${post.username}`}
          className="text-pink-600 font-medium hover:cursor-pointer hover:text-rose-500 dark:hover:text-rose-500 hover:font-bold"
        >
          @{post.username}
        </Link>
      </p>
      <Separator className="mb-5" />
      <ReactMarkdown className="prose dark:prose-invert">
        {post.content}
      </ReactMarkdown>
    </>
  );
}
