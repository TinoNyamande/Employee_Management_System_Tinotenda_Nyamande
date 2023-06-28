import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {
  authenticated = signal(false);
  role ="";

  storeToken(tokenValue:string) {
    localStorage.setItem('token',tokenValue)
  }
  getToken () {
    return localStorage.getItem('token')
  }
  isloggedIn():boolean {
    return !!localStorage.getItem('token')
  }
  setVar(val) {
    this.role = val;
  }
  getVar() {
    return this.role;
  }
}
