import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Korisnici {
  baseUrl: string = "https://pixel-judge-api.onrender.com/api";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
  
  getUserViaEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${email}`);
  }

  postUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, user);
  }

  updateUser(id: string, change: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/user/${id}`, change, {
      responseType: 'text'
    });
  }

  getAllComments(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allcomments/${id}`);
  }

  getComments(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/${id}`);
  }

  postComment(comment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/comment`, comment);
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comment/${id}`);
  }

  updateComment(id: string, change: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/comment/${id}`, change, {
      responseType: 'text'
    });
  }
}
