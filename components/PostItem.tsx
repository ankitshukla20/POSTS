"use client";
import { fromMillis } from "@/lib/firebase";
import { Post } from "@/lib/models";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoHeartSharp } from "react-icons/io5";

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
    <div className="w-full md:w-11/12 rounded-lg border-2 bg-white dark:bg-slate-800">
      <div className="pt-2 pb-3 px-4 md:pt-5 md:pb-5 md:px-8 hover:scale-[0.98] hover:duration-150 duration-150">
        {admin &&
          (post.published ? (
            <p className="text-green-500 mb-2 font-semibold">● Live</p>
          ) : (
            <p className="text-red-500 mb-2 font-semibold">Unpublished</p>
          ))}

        <div className="py-2">
          <Link
            href={`/${post.username}/${post.slug}`}
            className="text-xl font-semibold py-2 hover:underline hover:font-bold hover:cursor-pointer"
          >
            {post.title}
          </Link>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:gap-5 md:items-center">
          <p className="text-sm">
            By{" "}
            <Link href={`/${post.username}`}>
              <em className="text-pink-600 font-medium hover:cursor-pointer hover:text-rose-500 dark:hover:text-rose-500 hover:font-bold">
                @{post.username}
              </em>
            </Link>
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
          <p className="pt-2 sm:p-0 font-light flex gap-1 items-center">
            <IoHeartSharp className="text-red-500 text-lg" />
            <span>{post.heartCount}</span> Hearts
          </p>
        </div>

        {admin && (
          <>
            <Link href={`/admin/${post.slug}`}>
              <button className="mt-2 smky-btn3 relative hover:text-slate-50 py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-green-500 after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-gray-500">
                Edit
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
