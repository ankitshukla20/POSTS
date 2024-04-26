import { Post } from "@/lib/models";
import PostItem from "./PostItem";

interface Props {
  posts: Post[];
  admin?: boolean;
}

export default function PostFeed({ posts, admin = false }: Props) {
  const postItems = posts.map((post) => (
    <PostItem key={post.slug} post={post} admin={admin} />
  ));

  return (
    <div className="flex flex-col items-center gap-5 my-4">{postItems}</div>
  );
}
