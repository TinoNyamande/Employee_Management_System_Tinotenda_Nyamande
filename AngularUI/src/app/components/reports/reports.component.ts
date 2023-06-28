import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenserviceService } from 'src/app/services/tokenservice.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{

  public pfm:any =[];
  public users:any =[];
  public email:string = "";

  logout() {
    this.authservice.logout();
  }

  constructor(private fb:FormBuilder,private auth:AuthService,
    private tokenservice:TokenserviceService,
    private router:Router,
    private route:ActivatedRoute,
    private userstore:UserstoreService,
    private userapi:UserapiService,private authservice:AuthService) {

  }
  ngOnInit() {
    var newemail = this.route.snapshot.paramMap.get('email');
    this.email = newemail;
    this.userapi.getPerformances(this.email)
    .subscribe(res=>{
      this.pfm = Object.values(res);
      this.pfm = this.pfm[0];
      //this.email =this.applications[0]['email']
  })
  this.userapi.getUser(this.email)
  .subscribe(res=>{
    this.users = res.message;
    this.users = this.users})
}


  }