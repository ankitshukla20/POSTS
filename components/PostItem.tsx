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
    <Card className="w-11/12 md:w-7/8 lg:w-2/3">
      <CardHeader>
        <CardTitle className="text-xl">{post.title}</CardTitle>
        <CardDescription>
          By <em className="text-pink-600 font-medium">@{post.username}</em>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-1 sm:flex-row sm:items-center">
        <p className="flex-grow text-slate-400 text-sm">
          {wordCount} words, {minutesToRead} min read
        </p>
        <p className="text-sm pt-2 sm:p-0">❤️ {post.heartCount} Hearts</p>
      </CardFooter>
    </Card>
  );
}
