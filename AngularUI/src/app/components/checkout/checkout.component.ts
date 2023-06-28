import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserapiService } from 'src/app/services/userapi.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm:FormGroup;
  ctime = "2023-06-24";

  constructor(private fb:FormBuilder,private userapi:UserapiService,private authservice:AuthService) {

  }
  logout() {
    this.authservice.logout();
  }
  ngOnInit():void {
     
      this.checkoutForm = this.fb.group({
       email:['',Validators.required],
       workdone:['',Validators.required],
       checkintime:["2023-06-24"]

      })
  }
  onSubmit() {
    console.log(this.checkoutForm.value)
   if (this.checkoutForm.valid) {
     //send to back end
     //console.log(this.checkoutForm.value);
     this.userapi.checkout(this.checkoutForm.value)
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
