import { Component, OnInit } from '@angular/core';
import { UserstoreService } from './services/userstore.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   role:string

  constructor(private userstore:UserstoreService,private auth:AuthService) {}

  title = 'Employee management system';
   ngOnInit(): void {
    this.userstore.getRoleFromStore()
    .subscribe(res=>{
      
      let frole = this.auth.getRoleFromToken();
     this.role = frole;
   })
}
}