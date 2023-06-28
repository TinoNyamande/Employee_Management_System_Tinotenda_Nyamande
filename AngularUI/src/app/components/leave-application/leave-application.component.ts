import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenserviceService } from 'src/app/services/tokenservice.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.css']
})
export class LeaveApplicationComponent {
       
  leaveApplicationForm:FormGroup;
  email:string="";
  status:string = "pending";

  logout() {
    this.authservice.logout();
  }

  constructor(private fb:FormBuilder,private auth:AuthService,
    private tokenservice:TokenserviceService,
    private router:Router,
    private userstore:UserstoreService,
    private userapi:UserapiService,private authservice:AuthService) {

  }
  ngOnInit():void {
    console.log(this.auth.getRoleFromToken())
    this.userstore.getEmailFromStore()
    .subscribe(res=>{
      let femail = this.auth.getEmailFromToken();
     this.email = femail
    })

      this.leaveApplicationForm = this.fb.group({
       leaveType:['',Validators.required],
       startDate:['',Validators.required],
       endDate:['',Validators.required],
       description:['',Validators.required],
       email:[this.email],
       status:[this.status],
      })
  }
  onSubmit() {
   if (this.leaveApplicationForm.valid) {
     //send to back end
    // console.log(this.leaveApplicationForm.value);
     this.userapi.leaveApplication(this.leaveApplicationForm.value).subscribe({
      next:(res)=>{
        alert(res.message)
        this.leaveApplicationForm.reset()
        this.router.navigate(["dashboard"])
        
      },
      error:(err)=>{
        //alert(err?.error.message)
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
