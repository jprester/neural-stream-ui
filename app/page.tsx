// "use client";

import Image from "next/image";
import Posts from "./posts/page";
import PostsList from "@/components/PostsList";
import { XMLParser } from "fast-xml-parser";
import { FEED_SOURCES, PROXY_SERVER } from "@/helpers/apiConfig";
import { Posts as PostsType } from "@/types/";
import { parseFeedData } from "@/helpers/utils";

import { Inter } from "next/font/google";

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
        fetch(dataObject.FEED).then(async (response) => {
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
        })
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
      <header className="py-2">
        <h1 className="mx-4 text-center text-2xl font-bold">
          AI ASCENT - AI News aggregator
        </h1>
      </header>

      <PostsList postData={postsData} />
    </main>
  );
}
