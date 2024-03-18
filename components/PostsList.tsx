import React from "react";
import Link from "next/link";

import { Posts } from "@/types";
import { createKeyId } from "@/helpers/utils";

const PostsList = ({ postData }: { postData: Posts }) => {
  return (
    <>
      {postData.map((item, index) => {
        return (
          <div key={createKeyId(item.name, index)} className="mb-4 p-4">
            <h3 className="inline-block mb-2 text-xl tracking-tight text-grey-600 font-medium text-gray-100">
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
                      className="text-gray-300 text-md link border-b-2">
                      {article.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default PostsList;
