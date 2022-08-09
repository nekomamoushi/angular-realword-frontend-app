import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment, CommentResponse } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments(slug: string): Observable<Comment[]> {
    return this.http
      .get<CommentResponse>(`${environment.apiUrl}/articles/${slug}/comments`)
      .pipe(
        map((response) => {
          return response.comments;
        })
      );
  }
}
