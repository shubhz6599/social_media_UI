// src/app/services/friend.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private apiUrl = environment.ogApi + '/friends'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  sendFriendRequest(requesterId: string, recipientId: string): Observable<any> {
    const token = localStorage.getItem('authtoken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/send-request`, { requesterId, recipientId }, { headers });
  }

  confirmFriendRequest(requestId: string): Observable<any> {
    const token = localStorage.getItem('authtoken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/confirm-request`, { requestId }, { headers });
  }

  rejectFriendRequest(requestId: string): Observable<any> {
    const token = localStorage.getItem('authtoken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/reject-request`, { requestId }, { headers });
  }

  getFriendRequests(userId: string): Observable<any> {
    const token = localStorage.getItem('authtoken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/requests/${userId}`, { headers });
  }
  getSuggestions(userId: string): Observable<any[]> {
    const token = localStorage.getItem('authtoken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/suggestions/${userId}`, { headers });
  }
}
