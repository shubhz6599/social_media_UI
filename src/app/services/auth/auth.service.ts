import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authtoken';

  constructor() { }

  // Save token in local storage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Remove token from local storage
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
