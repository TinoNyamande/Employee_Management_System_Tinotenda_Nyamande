import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstoreService {

  
  private role$ = new BehaviorSubject<string>("")
  private email$ = new BehaviorSubject<string>("")

  constructor() { }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }
  public setRoleForStore(role:string) {
    this.role$.next(role)
  }



  public getEmailFromStore() {
    return this.email$.asObservable();
  }
  public setEmailForStore(email:string) {
    this.role$.next(email)
  }


}
