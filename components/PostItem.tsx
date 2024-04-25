import { Post } from "@/lib/models";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  post: Post;
  admin?: boolean;
}

export default function PostItem({ post, admin = false }: Props) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="w-11/12 py-5 px-8 rounded-xl border">
      <h1 className="text-xl font-semibold">{post.title}</h1>
      <p className="text-sm">
        By <em className="text-pink-600 font-medium">@{post.username}</em>
      </p>

      <div className="mt-7 flex flex-col items-start gap-1 sm:flex-row sm:items-center">
        <p className="flex-grow text-slate-400 text-sm">
          {wordCount} words, {minutesToRead} min read
        </p>
        <p className="pt-2 sm:p-0 font-light">❤️ {post.heartCount} Hearts</p>
      </div>
    </div>
  );
}
