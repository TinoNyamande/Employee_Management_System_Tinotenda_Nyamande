import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  public name = "";
  public phone = "";
  public email = "";
  public role = "";
  public users:any = [];
  public user:any = [];
  constructor ( private authservice:AuthService , private api:UserapiService,private userstore:UserstoreService) {}
  
    logout() {
      this.authservice.logout();
    }
    reload() {
      window.location.reload();
    }
    ngOnInit(): void {
      let fr = this.authservice.getRoleFromToken();
      this.role = fr
      let femail = this.authservice.getEmailFromToken();
       this.email =  femail
       console.log(this.email)
     // this.userstore.getEmailFromStore()
     // .subscribe(res=>{
     //   let femail = this.authservice.getEmailFromToken();
     //  this.email = res|| femail

       this.api.getUser(this.email)
       .subscribe(res=>{
         this.users = res.message;
         this.users = this.users
         console.log(this.users)
      // })
       //this.reload()
      // this.api.getUser(this.email)
       //.subscribe(res=>{
       //  this.users = res;
       //  console.log(this.users)
       //})
      })
     
     // this.userstore.getRoleFromStore()
     // .subscribe(res=>{
     //   let frole = this.authservice.getRoleFromToken();
      // this.role = res|| frole
      //})
    }
}
