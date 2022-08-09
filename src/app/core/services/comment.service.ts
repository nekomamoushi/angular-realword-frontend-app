import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Comment,
  CommentRequest,
  CommentResponse,
  CommentsResponse,
} from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments(slug: string): Observable<Comment[]> {
    return this.http
      .get<CommentsResponse>(`${environment.apiUrl}/articles/${slug}/comments`)
      .pipe(
        map((response) => {
          return response.comments;
        })
      );
  }

  addComment(slug: string, body: string): Observable<Comment> {
    const data: CommentRequest = { comment: { body } };
    return this.http
      .post<CommentResponse>(
        `${environment.apiUrl}/articles/${slug}/comments`,
        data
      )
      .pipe(
        map((response) => {
          return response.comment;
        })
      );
  }

  deleteComment(slug: string, id: number) {
    return this.http.delete(
      `${environment.apiUrl}/articles/${slug}/comments/${id}`
    );
  }
}
