import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile, ProfileResponse } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(username: string): Observable<Profile> {
    return this.http
      .get<ProfileResponse>(`${environment.apiUrl}/profiles/${username}`)
      .pipe(
        map((response) => {
          return response.profile;
        })
      );
  }
}
