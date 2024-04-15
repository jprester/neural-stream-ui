import React from "react";
import Link from "next/link";

import { Posts } from "@/types";
import { createKeyId } from "@/helpers/utils";
import { Button, ListGroup, ListGroupItem } from "flowbite-react";

const PostsList = ({ postData }: { postData: Posts }) => {
  return (
    <>
      {postData.map((item, index) => {
        return (
          <div key={createKeyId(item.name, index)} className="mb-4 p-4">
            <h3 className="inline-block mb-2 text-xl tracking-tight text-grey-600 font-medium text-gray-100">
              {item.name}
            </h3>
            <ListGroup className="dark:bg-gray-800">
              {item.data.map((article, index) => {
                return (
                  <ListGroupItem
                    key={createKeyId(article.title, index)}
                    href={`${article.id || article.link}`}
                  >
                    {article.title}
                  </ListGroupItem>
                );
              })}
            </ListGroup>
            <div className="mt-4 flex justify-end">
              <Button
                color="primary"
                outline
                className="dark:bg-gray-800 dark:text-grey-100 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                href={item.webLink}
              >
                More...
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostsList;
