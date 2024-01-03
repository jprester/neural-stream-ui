import React from "react";
import Link from "next/link";
import { Posts } from "@/types";

const PostsList = ({ data }: { data: Posts }) => {
  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <Link href={`/posts/${item.id}`}>{item.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostsList;
