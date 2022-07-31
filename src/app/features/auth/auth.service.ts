import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User, UserResponse } from 'src/app/core/models/user';
import { environment } from '../../../environments/environment';

const CURRENT_USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/users`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.currentUser$.pipe(map((user) => !!user));

  constructor(private http: HttpClient) {
    const currentUser = this.getUserFromLocalStorage();
    this.currentUserSubject.next(currentUser);
  }

  get currentUser() {
    return this.currentUserSubject.value;
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http
      .post<UserResponse>(`${this.baseUrl}`, {
        user: {
          username,
          email,
          password,
        },
      })
      .pipe(
        map((response: UserResponse) => {
          this.saveUserToLocalStorage(response.user);
          this.currentUserSubject.next(response.user);
          return response.user;
        })
      );
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<UserResponse>(`${this.baseUrl}/login`, {
        user: {
          email,
          password,
        },
      })
      .pipe(
        map((response: UserResponse) => {
          this.saveUserToLocalStorage(response.user);
          this.currentUserSubject.next(response.user);
          return response.user;
        })
      );
  }

  logout() {
    this.removeUserFromLocalStorage();
    this.currentUserSubject.next(null);
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User | null {
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);

    if (!currentUser) {
      return null;
    }

    return JSON.parse(currentUser);
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}
