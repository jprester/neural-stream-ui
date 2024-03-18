import React from "react";
import Link from "next/link";

import { ListGroup, ListGroupItem, List } from "flowbite-react";
import { Card } from "flowbite-react";
import { Posts } from "@/types";
import { createKeyId } from "@/helpers/utils";

const PostsList = ({ postData }: { postData: Posts }) => {
  // console.log("data: ", data);

  return (
    <>
      <div className="lg:w-1/2 sm:w-1/1">
        {postData.map((item, index) => {
          return (
            <div key={createKeyId(item.name, index)} className="mb-4 p-4">
              {/* <Card className="block p-6 mb-6 rounded-lg  bg-gray-800  border-none lg:mb-0"> */}
              <h3 className="inline-block mb-2 text-3xl tracking-tight text-grey-600 font-medium text-grey-100">
                {item.name}
              </h3>
              <ul>
                {item.data.map((article: any, index: number) => {
                  return (
                    <li
                      key={createKeyId(article.title, index)}
                      className="py-2 mx-0">
                      <Link
                        href={`${article.id || article.link}`}
                        className="hover:text-gray-60 text-lg link">
                        {article.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {/* </Card> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PostsList;
