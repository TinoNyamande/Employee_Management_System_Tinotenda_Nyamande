import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserstoreService } from './userstore.service';
import { UserapiService } from './userapi.service';
import { TokenApiModel } from '../models/token-api.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string =  "https://localhost:7293/api/User/"
  private userPayload:any;
  private id:any;
  public companies:any = [];
  public isLogged = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient,private router:Router,private userapi:UserapiService) { 
    this.userPayload = this.decodedToken();
    
  }

  signup(userObj:any) {
     return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }
  addUser(userObj:any) {
    return this.http.post<any>(`${this.baseUrl}addemployee` ,userObj);
  }
  checkin(Obj:any) {
    return this.http.post<any>("https://localhost:7293/api/Performance/checkin",Obj);
   
    
  }
 
  login(userObj:any) {
    this.isLogged.next(true)
    return this.http.post<any>(`${this.baseUrl}authenticate`,userObj)
  }
  

  storeToken(tokenValue:string) {
    localStorage.setItem('token',tokenValue)
  }
  getToken () {
    const token = localStorage.getItem('token')
    return localStorage.getItem('token')
  }
  isloggedIn() {
    //var  _isLoggedIn = new BehaviorSubject<boolean>(false);
    if (!!localStorage.getItem('token')) {
      this.isLogged.next(true);
      return this.isLogged.asObservable();
    }
    else{
      return this.isLogged.next(false);
    }
    //return !!localStorage.getItem('token')
  }
  logout() {
    
    localStorage.removeItem("token")
    localStorage.clear();
    alert("logged out successful");
    this.router.navigate(["home"]);
  }
  decodedToken(){
        const jwtHelper = new JwtHelperService();
        //if (jwtHelper.isTokenExpired('token')){
        // console.log("Expired");
        //}
        const token = this.getToken();
        console.log(jwtHelper.decodeToken(token))
        //console.log(token)
        return jwtHelper.decodeToken(token);
        //return "none";
  }

  getEmailFromToken() {
    if(this.userPayload) {
      return this.userPayload.email;
    }
  }
 

  getRoleFromToken() {
    if(this.userPayload) {
      return this.userPayload.role;
    }
  }
  renewToken (tokenApi:TokenApiModel) {
    return this.http.post<any>(`${this.baseUrl}refresh`,tokenApi);
  }
  storeRefreshToken (tokenValue:string) {
    localStorage.setItem('refreshToken' , tokenValue)
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  
}

