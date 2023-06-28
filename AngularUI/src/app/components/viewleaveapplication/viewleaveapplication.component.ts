import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-viewleaveapplication',
  templateUrl: './viewleaveapplication.component.html',
  styleUrls: ['./viewleaveapplication.component.css']
})
export class ViewleaveapplicationComponent {
  public apps:any = [];
  public users:any = [];
  public email = "";

  

  constructor (  private api:UserapiService,
    private authservice:AuthService,
    private userstore:UserstoreService,
    private userapi:UserapiService) {}

  logout() {
    this.authservice.logout();
  }
  ngOnInit(): void {
    this.userstore.getEmailFromStore()
    .subscribe(res=>{
      let femail = this.authservice.getEmailFromToken();
     this.email = res|| femail 
    })
    this.api.getLeaveAllApplications(this.email)
    .subscribe(res=>{
      this.apps = Object.values(res);
      this.apps= this.apps[0]
      console.log(this.apps)
    })
  
  }
 
  

}
