import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent {
  constructor ( private api:UserapiService,private authservice:AuthService,private userstore:UserstoreService) {}
  public users:any = [];
  public email = "";
  

  logout() {
    this.authservice.logout();
  }

  
  ngOnInit(): void {
    this.userstore.getEmailFromStore()
    .subscribe(res=>{
      let femail = this.authservice.getEmailFromToken();
     this.email = res|| femail 
    })
    this.api.getUsers(this.email)
    .subscribe(res=>{
      this.users = Object.values(res);
      this.users = this.users[0]
      //console.log(this.users[0])
    })
  }
  viewperformance(email:string) {
    console.log(email);
  }

}
