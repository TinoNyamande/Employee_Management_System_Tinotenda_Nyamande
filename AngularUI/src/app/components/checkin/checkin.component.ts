import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent {
  checkoutForm:FormGroup;
  ctime = "2000-01-01";
  h = 0;
  work = "None"
  cemail=""

  constructor(private fb:FormBuilder,
    private getdata:GetdataService,
    private userapi:UserapiService,
    private authservice:AuthService,
    private userstore:UserstoreService) {

  }

  logout() {
    this.authservice.logout();
  }
  ngOnInit():void {
    this.userstore.getEmailFromStore()
    .subscribe(res=>{
      let femail = this.authservice.getEmailFromToken();
     this.cemail = res|| femail
    })
     
      this.checkoutForm = this.fb.group({
       email:['',Validators.required],
       workdone:[this.work,Validators.required],
       checkintime:[this.ctime,Validators.required],
       checkouttime:[this.ctime,Validators.required],
       hoursworked:[this.h,Validators.required],
       date:[this.ctime,Validators.required],
       companyemail:[this.cemail,Validators.required]

      })
  }
  onSubmit() {
    console.log(this.checkoutForm.value)
   if (this.checkoutForm.valid) {
     //send to back end
     //console.log(this.checkoutForm.value);
     this.userapi.checkin(this.checkoutForm.value)
     .subscribe({
       next:(res)=>{
      alert(res.message);
     },
     error:(err)=>{
      //alert(err.message)
    }
     })
   }
   else {
         this.validateAllFormFields(this.checkoutForm);
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
