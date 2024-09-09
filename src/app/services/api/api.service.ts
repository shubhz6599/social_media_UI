import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.postapiUrl; // Ensure this is correctly set in the environment file

  constructor(private http: HttpClient) { }

  // Method to get all posts
  getPosts(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/all`, { headers });
  }

  // Method to get posts by category
  getPostsByCategory(token: string, category: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/category/${category}`, { headers });
  }

  // Method to create a new post with an image
  createPost(data: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/create`, data, { headers });
  }

  likePost(postId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/like/${postId}`, {}, { headers });
  }

  getPostsByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  editPost(postId: string, postData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit/${postId}`, postData);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${postId}`);
  }

}
