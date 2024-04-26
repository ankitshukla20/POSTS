"use client";
import { fromMillis } from "@/lib/firebase";
import { Post } from "@/lib/models";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface Props {
  post: Post;
  admin?: boolean;
}

export default function PostItem({ post, admin = false }: Props) {
  const router = useRouter();
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  let createdAt = new Date();
  if (typeof post.createdAt === "number") {
    createdAt = fromMillis(post.createdAt).toDate();
  }

  return (
    <div
      className="w-11/12 py-5 px-8 rounded-2xl border-2 bg-white dark:bg-slate-800 hover:cursor-pointer hover:scale-105 hover:duration-150 duration-150"
      onClick={() => {
        router.push(`/${post.username}/${post.slug}`);
      }}
    >
      {admin &&
        (post.published ? (
          <p className="text-green-500 mb-2 font-semibold">● Live</p>
        ) : (
          <p className="text-red-500 mb-2 font-semibold">Unpublished</p>
        ))}

      <div>
        <h1 className="text-xl font-semibold mb-2">{post.title}</h1>
      </div>

      <div className="flex flex-col gap-1 md:flex-row md:gap-5 md:items-center">
        <p className="text-sm">
          By <em className="text-pink-600 font-medium">@{post.username}</em>
        </p>
        <p className="text-slate-400 hidden md:block">|</p>
        <p className="text-sm text-slate-400">
          Created at{" "}
          <span className="font-semibold">
            {format(createdAt, "yyyy-MM-dd")}
          </span>
        </p>
      </div>

      <div className="mt-10 flex flex-col items-start gap-1 sm:flex-row sm:items-center">
        <p className="flex-grow text-slate-400 text-sm">
          {wordCount} words, {minutesToRead} min read
        </p>
        <p className="pt-2 sm:p-0 font-light">❤️ {post.heartCount} Hearts</p>
      </div>

      {admin && (
        <>
          <button className="mt-2 smky-btn3 relative hover:text-slate-50 py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-green-500 after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-gray-500">
            Edit
          </button>
        </>
      )}
    </div>
  );
}
