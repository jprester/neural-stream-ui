import { ListGroup, ListGroupItem } from "flowbite-react";

const UngroupedPostList = ({ newsItems }: any) => {
  if (!newsItems?.length) return null;
  // sort by date
  newsItems.sort((a: any, b: any) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
  return (
    <ListGroup>
      {newsItems?.map((item: any, index: number) => {
        return <ListGroupItem key={index}>{item.title}</ListGroupItem>;
      })}
    </ListGroup>
  );
};

export default UngroupedPostList;
