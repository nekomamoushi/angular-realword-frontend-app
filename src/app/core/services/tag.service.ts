import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag, TagResponse } from '../models/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}

  getAllTags(): Observable<Tag[]> {
    return this.http.get<TagResponse>(`${environment.apiUrl}/tags`).pipe(
      map((response: TagResponse) => {
        return response.tags;
      })
    );
  }
}
