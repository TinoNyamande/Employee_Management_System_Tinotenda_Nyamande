import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-employeeperformances',
  templateUrl: './employeeperformances.component.html',
  styleUrls: ['./employeeperformances.component.css']
})
export class EmployeeperformancesComponent {
  public performances:any = [];
  email:string = "";
  role:string="";



 constructor ( private api:UserapiService ,private authservice:AuthService,private userstore:UserstoreService) {}

 logout() {
   this.authservice.logout();
 }


 ngOnInit(): void {
   this.userstore.getEmailFromStore()
   .subscribe(res=>{
     let femail = this.authservice.getEmailFromToken();
    this.email = res|| femail

    
   })
   this.userstore.getRoleFromStore()
     .subscribe(res=>{
       let frole = this.authservice.getRoleFromToken();
      this.role = res|| frole
     })
 
   
   this.api.getAllPerformances(this.email)
   .subscribe({
     next:(res)=>{
    //alert(res.message);
    //console.log(res)
    this.performances = Object.values(res);
   this.performances = this.performances[0]
   console.log(this.performances)
   },
   error:(err)=>{
    console.log(err.message)
   }
   })
 }
}
