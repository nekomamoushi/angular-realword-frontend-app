import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Article,
  ArticleRequest,
  ArticleResponse,
  ArticlesResponse,
} from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getAllArticle(): Observable<Article[]> {
    return this.http
      .get<ArticlesResponse>(`${environment.apiUrl}/articles`)
      .pipe(
        map((response) => {
          return response.articles;
        })
      );
  }

  getArticle(slug: string): Observable<Article> {
    return this.http
      .get<ArticleResponse>(`${environment.apiUrl}/articles/${slug}`)
      .pipe(
        map((response) => {
          return response.article;
        })
      );
  }

  createArticle(article: ArticleRequest): Observable<Article> {
    return this.http
      .post<ArticleResponse>(`${environment.apiUrl}/articles`, { article })
      .pipe(
        map((response) => {
          return response.article;
        })
      );
  }

  updateArticle(slug: string, article: ArticleRequest): Observable<Article> {
    return this.http
      .put<ArticleResponse>(`${environment.apiUrl}/articles/${slug}`, {
        article,
      })
      .pipe(
        map((response) => {
          return response.article;
        })
      );
  }
}
