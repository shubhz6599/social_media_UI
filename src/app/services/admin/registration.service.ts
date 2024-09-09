import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signup(user: { userName: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  signin(credentials: { userName: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  resetPassword(data: { email: string, password: string, confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetPassword`, data);
  }
  getUserProfile(): Observable<any> {
    const userId = localStorage.getItem('userId'); // Get the logged-in user ID from local storage
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updateUserProfile(userId: string, data: FormData): Observable<any> {
    // const userId = localStorage.getItem('userId'); // Get the logged-in user ID from local storage
    return this.http.put(`${this.apiUrl}/users/${userId}`, data);
  }

}
