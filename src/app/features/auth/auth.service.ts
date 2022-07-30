import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}`, {
      user: {
        username,
        email,
        password,
      },
    });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, {
      user: {
        email,
        password,
      },
    });
  }
}
