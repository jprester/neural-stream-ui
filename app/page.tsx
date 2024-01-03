import Image from "next/image";
import Posts from "./posts/page";
import PostsList from "@/components/PostsList";
import { Posts as PostsType } from "@/types/";

export default async function Home() {
  const postListFakes = [
    { id: 1, name: "test" },
    { id: 2, name: "test2" },
  ];

  const postsResponse = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const postsData: PostsType = await postsResponse.json();

  // console.log("postsData: ", postsData);

  return (
    <main>
      <h1>STAAAAARt</h1>
      <PostsList data={postsData} />
    </main>
  );
}
