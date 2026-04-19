import { ListGroup, ListGroupItem } from "flowbite-react";

import { NewsItem } from "@/types";
import { sortByDate } from "@/helpers/utils";

const UngroupedPostList = ({ newsItems }: { newsItems: NewsItem[] }) => {
  if (!newsItems?.length) return null;

  const sorted = sortByDate(newsItems, (item) => item.date);

  return (
    <ListGroup>
      {sorted.map((item, index) => (
        <ListGroupItem key={index}>{item.title}</ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default UngroupedPostList;
