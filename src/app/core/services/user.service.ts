import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfileResponse } from '../models/profile';
import { User, UserResponse } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<UserResponse>(`${environment.apiUrl}/user`).pipe(
      map((response: UserResponse) => {
        return response.user;
      })
    );
  }

  updateUser(user: any): Observable<User> {
    return this.http
      .put<UserResponse>(`${environment.apiUrl}/user`, {
        user: user,
      })
      .pipe(
        map((response: UserResponse) => {
          return response.user;
        })
      );
  }
}
