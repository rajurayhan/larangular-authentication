import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  signUp(data){
    return this.http.post(`${this.baseUrl}/signup`, data)
  }

  login(data){
    return this.http.post(`${this.baseUrl}/login`, data)
  }

  resetRequest(data){
    return this.http.post(`${this.baseUrl}/reset-password`, data)
  }

  chagnePassword(data){
    return this.http.post(`${this.baseUrl}/reset-password-post`, data)
  }
}
