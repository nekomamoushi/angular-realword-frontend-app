import { Profile } from './profile';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface ArticleRequest {
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
}

export interface ArticleResponse {
  article: Article;
}
export interface ArticlesResponse {
  articles: Article[];
}
