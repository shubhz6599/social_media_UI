import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class OnlinePeopleService {
  private apiUrl = environment.ogApi + '/user/all'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    const token = localStorage.getItem('authtoken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
