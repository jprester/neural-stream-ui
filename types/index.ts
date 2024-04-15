export type Post = {
  id: number;
  name: string;
  webLink: string;
  type: string;
  userId: number;
  data: Article[];
};

export type Article = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  category: string[];
  guid: string;
  description: string;
};

export enum FeedType {
  Articles = "articles",
  Videos = "videos",
  Scipapers = "scipapers",
}

export type Posts = Post[];
