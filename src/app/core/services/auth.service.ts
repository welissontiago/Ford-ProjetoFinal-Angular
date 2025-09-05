import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3001/users';
  private readonly userKey = 'currentUser';

  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  register(user: Omit<User, 'role' | 'id'>): Observable<User> {
    const userWithRole: User = { ...user, role: 'usuario' };
    return this.http.post<User>(this.apiUrl, userWithRole);
  }

  login(credentials: Pick<User, 'email' | 'password'>): Observable<User[]> {
    return this.http
      .get<User[]>(
        `${this.apiUrl}?email=${credentials.email}&password=${credentials.password}`
      )
      .pipe(
        tap((users) => {
          if (users.length) {
            this.storageService.setItem(this.userKey, users[0]);
          }
        })
      );
  }

  logout(): void {
    this.storageService.removeItem(this.userKey);
  }

  getCurrentUser(): User | null {
    return this.storageService.getItem<User>(this.userKey);
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === 'admin' : false;
  }

  hasRole(role: Role): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }
}
