export default function Banner() {
  return (
    <div className="mt-4 mb-3 duration-500 group overflow-hidden relative rounded-lg bg-neutral-100 shadow-md dark:border-2 dark:bg-slate-900 text-neutral-900 dark:text-neutral-50 py-5 px-8 flex flex-col justify-evenly">
      <div className="absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-purple-400 dark:bg-purple-900 right-1 -bottom-24"></div>
      <div className="absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-violet-100 dark:bg-violet-700 right-12 bottom-12"></div>
      <div className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-violet-200 dark:bg-violet-800 right-1 -top-12"></div>
      <div className="absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-purple-100 dark:bg-purple-700 rounded-full group-hover:-translate-x-12"></div>
      <div className="z-10 flex flex-col justify-evenly w-full h-full">
        <h1 className="text-xl font-bold mb-2">
          Blogging Made Simple, with POSTS.
        </h1>
        <p className="mb-2 text-lg">
          Discover the simplicity of blogging with POSTS. Join us and start
          sharing your stories, thoughts, and ideas with the world.
        </p>
        <p className="font-medium">Join POSTS and start blogging today.</p>
      </div>
    </div>
  );
}
