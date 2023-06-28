import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {

  private baseUrl:string =  "https://localhost:7293/api/"; 

  constructor(private http:HttpClient,private router:Router) { }


  getUsers(email) {
    return this.http.get<any>(`${this.baseUrl}User/${email}`);
  }
  getPerformances(email) {
    return this.http.get<any>(`${this.baseUrl}Performance/${email}`);
  }
  getAllPerformances(email) {
    return this.http.get<any>(`${this.baseUrl}Performance/employees/${email}`);
  }
  getLeaveApplications(email) {
    return this.http.get<any>(`${this.baseUrl}Leave/${email}`);
  }
  leaveApproval(lObj:any) {
    return this.http.post<any>(`${this.baseUrl}Leave/leave-application-approval`,lObj);
    
  }
  getLeaveAllApplications(email) {
    return this.http.get<any>(`${this.baseUrl}Leave/leave-applications/${email}`);
  }
  getApplicationsById(id:number) {
    return this.http.get<any>(`${this.baseUrl}Leave/get-application-by-id/${id}`)
  }
  getId(email) {
    return this.http.get<any>(`${this.baseUrl}Company/get-company-id/${email}`);
  }


  signup(userObj:any) {
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
 }
 


  getUser(email) {
    return this.http.get<any>(`${this.baseUrl}User/user/${email}`,{});
  }

  getDepartments() {
    return this.http.get<any>(this.baseUrl +"Department");
  }

  

  

  checkCompany(email) {
    return this.http.post<any>(`${this.baseUrl}Company/check-company/${email}`,{});
    
  }

  checkEmail(email) {
    return this.http.post<any>(`${this.baseUrl}User/check-email/${email}`,{});
    
  }


  createCompany(cObj :any) {
    return this.http.post<any>(`${this.baseUrl}Company/createCompany`,cObj)
  }
  leaveApplication(pObj:any) {
    return this.http.post<any>(`${this.baseUrl}Leave/LeaveApplication`,pObj);
  }

  addDepartment(deptObj:any) {
    return this.http.post<any>(`${this.baseUrl}Department/createDepartment`,deptObj);
  }

  checkin(Obj:any) {
    return this.http.post<any>(`${this.baseUrl}Performance/checkin`,Obj);
    
  }

  

  checkout(Obj:any) {
    return this.http.post<any>(`${this.baseUrl}Performance/checkout`,Obj);
  }

}
