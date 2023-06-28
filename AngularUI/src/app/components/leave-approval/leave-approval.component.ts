import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenserviceService } from 'src/app/services/tokenservice.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent {
  leaveApplicationForm:FormGroup;
  companyEmail:string="";
  public email:string = "";
  description:string="";
  status:string = "approved";
  cid=0;
  ctime = "2023-06-27";
  id:number;
  public applications:any =[];

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
  ngOnInit():void {
    var newid = this.route.snapshot.paramMap.get('id');
    this.id = <number><unknown>newid;
    this.userapi.getApplicationsById(this.id)
    .subscribe(res=>{
      this.applications = Object.values(res);
      this.applications = this.applications[0];
      this.email =this.applications[0]['email']

      this.leaveApplicationForm = this.fb.group({
        id:[this.id],
        leaveType:[''],
        applicationDate:[this.ctime],
        startDate:['',Validators.required],
        endDate:['',Validators.required],
        description:["None"],
        email:[this.email],
        status:[this.status],
        companyId:[this.cid],
        companyName:[this.companyEmail]
        
      
       })
       console.log(this.email)
       this.userstore.getEmailFromStore()
    .subscribe(res=>{
      let femail = this.auth.getEmailFromToken();
     this.companyEmail = femail
    })

     
      
    })
    
    //console.log(this.auth.getRoleFromToken())
    
   
    

      
  }
  onSubmit() {

    console.log(this.leaveApplicationForm.value);
   if (this.leaveApplicationForm.valid) {
     //send to back end
     console.log(this.leaveApplicationForm.value);
     this.userapi.leaveApproval(this.leaveApplicationForm.value).subscribe({
      next:(res)=>{
        alert(res.message)
        this.leaveApplicationForm.reset()
        this.router.navigate(["dashboard"])
        
      },
      error:(err)=>{
       // alert(err?.error.message)
        //this.router.navigate(["home"]);
      }
    })
   }
   else {
         this.validateAllFormFields(this.leaveApplicationForm);
         alert("Form is invalid");
   }
  }

  private validateAllFormFields (formGroup:FormGroup) {
     Object.keys(formGroup.controls).forEach(field=>{
       const control = formGroup.get(field);
       if (control instanceof FormControl) {
         control.markAsDirty({onlySelf:true});
       } else if (control instanceof FormGroup) {
         this.validateAllFormFields(control)
       }
     })
  }

}
