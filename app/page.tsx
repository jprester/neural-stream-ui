// "use client";

import Image from "next/image";
import Posts from "./posts/page";
import PostsList from "@/components/PostsList";
import { XMLParser } from "fast-xml-parser";
import { FEED_SOURCES, PROXY_SERVER } from "@/helpers/apiConfig";
import { Posts as PostsType } from "@/types/";
import { parseFeedData } from "@/helpers/utils";
import Logo from "public/logo.svg";

import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
});

export default async function Home() {
  // const postsResponse = await fetch(
  //   "https://jsonplaceholder.typicode.com/posts"
  // );

  const getPosts = async () => {
    const parser = new XMLParser();

    const feedRequestData = Object.entries(FEED_SOURCES).map(
      ([key, value]) => ({
        id: key.toUpperCase(),
        ...value,
      })
    );

    try {
      const dataPromises = feedRequestData.map((dataObject) =>
        fetch(dataObject.FEED, { next: { revalidate: 3600 } }).then(
          async (response) => {
            const xmlResponse = await response.text();

            const parsedResult = parser.parse(xmlResponse);

            const parsedFeedData = parseFeedData(parsedResult, 5);

            return {
              feedName: dataObject.NAME,
              webLink: dataObject.WEB_LINK,
              name: dataObject.NAME,
              type: dataObject.TYPE,
              data: parsedFeedData,
            };
          }
        )
      );
      const promiseData = await Promise.all(dataPromises);

      const updatedArray = promiseData
        .filter((item) => item?.data?.length > 0)
        .sort((a, b) => {
          // Sort entries by the date of the first article
          if (a.data[0].published < b.data[0].published) return 1;
          if (a.data[0].published > b.data[0].published) return -1;
          return 0;
        });

      return updatedArray;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const postsData: any = await getPosts();

  return (
    <main className={inter.className}>
      <div className="mx-auto lg:w-3/4 p-2">
        <header className="py-4 mb-4">
          <h1 className="mx-4 text-center lg:text-left font-medium text-3xl text-gray-300 align-bottom flex items-center">
            <Link href="./" className="align-bottom items-baseline">
              <Image src={Logo} alt="AI Ascent Logo" width={20} height={20} />
            </Link>
            <Link href="./" className="align-bottom items-baseline">
              <span className="mx-2 font-semibold text-left">AI ASCENT</span>
            </Link>
            <span className="ml-1 font-extralight hidden text-base mt-3 pb-0 sm:block">
              Place For tracking AI progress
            </span>
          </h1>
        </header>

        <div>
          <PostsList postData={postsData} />
        </div>
      </div>
    </main>
  );
}
