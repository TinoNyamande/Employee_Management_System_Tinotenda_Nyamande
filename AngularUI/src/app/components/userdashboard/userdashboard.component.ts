import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent {
  public name = "";
  public phone = "";
  public email = "";
  public role = "";
  public users:any = [];
  constructor ( private authservice:AuthService , private api:UserapiService,private userstore:UserstoreService) {}
  
    logout() {
      this.authservice.logout();
    }
    ngOnInit(): void {
       
      this.userstore.getEmailFromStore()
      .subscribe(res=>{
        let femail = this.authservice.getEmailFromToken();
       this.email = res|| femail

       this.api.getUser(this.email)
       .subscribe(res=>{
         this.users = res;
         console.log(this.users)
       })
      })
     
      this.userstore.getRoleFromStore()
      .subscribe(res=>{
        let frole = this.authservice.getRoleFromToken();
       this.role = res|| frole
      })
    }
}
