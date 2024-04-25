import PostList from "../../components/PostList";
import CreateNewPost from "./CreateNewPost";

export default function AdminPostsPage() {
  return (
    <>
      <CreateNewPost />
      <PostList />
    </>
  );
}
