export type Post = {
  id?: number;
  name: string;
  webLink: string;
  type: string;
  userId?: number;
  moreButton?: boolean;
  data: Article[] | NewsItem[];
};

export type NewsItem = {
  title: string;
  link: string;
  date: string;
  tags: string[];
  content: string;
  id?: string;
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
