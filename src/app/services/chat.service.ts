// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;
  private readonly URL = environment.ogApi; // Ensure this matches your server's URL

  constructor(private http: HttpClient) {
    this.socket = io(this.URL);
  }

  joinRoom(userId: string): void {
    this.socket.emit('joinRoom', userId);
  }

  sendMessage(senderId: string, recipientId: string, message: string): void {
    // Emit the message for real-time communication
    this.socket.emit('sendMessage', { senderId, recipientId, message });
    const token = localStorage.getItem('authtoken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Also send the message to the backend API to store it in the database
    this.http.post(`${this.URL}/messages/send`, { recipientId, content: message }, { headers })
      .subscribe({
        next: () => console.log('Message sent to backend API.'),
        error: (err) => console.error('Error sending message to backend API:', err)
      });
  }

  onMessageReceived(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (data: any) => {
        observer.next(data);
      });
    });
  }

  fetchChatHistory(chatUserId: string): Observable<any> {
    const token = localStorage.getItem('authtoken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.URL}/messages/history/${chatUserId}`, { headers });
  }
}
