import React from "react";
import { Spinner } from "flowbite-react";

import { Post as PostType } from "@/types";

type ParamsProps = {
  params: {
    id: string;
  };
};

const PostDetail = async ({ params }: ParamsProps) => {
  let singlePostData: PostType | null = null;

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    singlePostData = await res.json();
    // console.log("post: ", singlePostData);
  } catch (error) {
    // console.log("error: ", error);
  }
  if (!singlePostData) return <Spinner />;

  console.log("render post page");

  return (
    <div>
      <h1>Post Details for Post ID: {params.id}</h1>
      <div>
        <h2>{singlePostData.title}</h2>
      </div>
    </div>
  );
};

export default PostDetail;
