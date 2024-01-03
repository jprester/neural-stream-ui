import React from "react";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "flowbite-react";
import { Posts } from "@/types";

const PostsList = ({ data }: { data: Posts }) => {
  return (
    <>
      <div className="w-1/2 sm:w-1/1">
        <ListGroup>
          <ListGroupItem>Articles</ListGroupItem>
          {data.map((item) => {
            return (
              <div key={item.id}>
                <ListGroupItem
                  href={`/posts/${item.id}`}
                  // className="font-medium text-blue-700 dark:text-blue-500 hover:underline"
                >
                  {item.title}
                </ListGroupItem>
              </div>
            );
          })}
        </ListGroup>
      </div>
    </>
  );
};

export default PostsList;
