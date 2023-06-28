import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseUrl:string =  "https://localhost:7293/api/User/";
  constructor(private http:HttpClient) { }

  sendPasswordLink(email) {
    return this.http.post<any>(`${this.baseUrl}send-reset-email/${email}`,{});
    
  }
}
