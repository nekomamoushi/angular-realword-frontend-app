import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, ArticleResponse, ArticlesResponse } from '../models/article';

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
}
