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

export function parseFeedData(data: Record<string, unknown>, limit: number = 10): Record<string, unknown>[] {
  const rss = data?.rss as Record<string, unknown> | undefined;
  if (!rss?.channel && !data?.feed) {
    return [];
  }

  const feedResult = (data?.feed ?? rss?.channel) as Record<string, unknown>;

  let feedData: Record<string, unknown>[];
  if (feedResult?.item) {
    feedData = (feedResult.item as Record<string, unknown>[]).filter(
      (_item, index) => index < limit
    );
  } else if (feedResult?.entry) {
    feedData = (feedResult.entry as Record<string, unknown>[]).filter(
      (_item, index) => index < limit
    );
  } else {
    feedData = [];
  }

  return feedData;
}

export function addOrUpdateObject<T extends { webLink: string }>(array: T[], newObject: T): T[] {
  const newArray = [...array];
  const index = newArray.findIndex((item) => item.webLink === newObject.webLink);
  if (index !== -1) {
    newArray[index] = newObject;
  } else {
    newArray.push(newObject);
  }
  return newArray;
}

export function sortByDate<T>(arr: T[], getDate: (item: T) => string): T[] {
  return [...arr].sort((a, b) => {
    const da = getDate(a);
    const db = getDate(b);
    if (da < db) return 1;
    if (da > db) return -1;
    return 0;
  });
}

export function isSafeUrl(url: string): boolean {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

export function formatDate(date: string) {
  return date.slice(0, 10);
}

export const createKeyId = (name: string, index: number) => {
  if (!name) return uuidv4();

  const formattedName = name.replace(/\s/g, "-").toLowerCase();

  return `${formattedName}-${index}`;
};
