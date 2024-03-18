import { v4 as uuidv4 } from "uuid";

export function createIdFromTitle(title: string) {
  if (!title || !title.length) {
    return "";
  }

  const sanitizedText = title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/  /g, " ");
  const textArray = sanitizedText.split(" ");

  return textArray.join("-");
}

export function parseFeedData(data: any, limit: number = 10) {
  if (!data?.rss?.channel && !data?.feed) {
    return {};
  }

  const feedResult = data?.feed || data?.rss?.channel;

  let feedData;
  if (feedResult?.item) {
    feedData = feedResult.item.filter(
      (item: any, index: number) => index < limit && item
    );
  } else if (feedResult?.entry) {
    feedData = feedResult.entry.filter(
      (item: any, index: number) => index < limit && item
    );
  } else {
    feedData = [];
  }

  return feedData;
}

export function addOrUpdateObject(array: any[], newObject: any) {
  let newArray = array;
  const index = newArray.findIndex(
    (item) => item.webLink === newObject.webLink
  );
  if (index !== -1) {
    newArray[index] = newObject;
  } else {
    newArray.push(newObject);
  }

  return newArray;
}

export function formatDate(date: string) {
  return date.slice(0, 10);
}

export const createKeyId = (name: string, index: number) => {
  if (!name) return uuidv4();

  const formatedName = name.replace(/\s/g, "-").toLowerCase();

  return `${formatedName}-${index}`;
};
