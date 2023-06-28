import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenserviceService } from 'src/app/services/tokenservice.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  faUser = faUser;
  faLock = faLock;
  role:string ="";

  showPassword:boolean = false ;
  checked:string = "";
  public togglePassword () {
   this.showPassword = !this.showPassword;
   this.checked = "checked";
  }

  signupForm:FormGroup;

  constructor(private fb:FormBuilder ,
     private auth:AuthService,
     private router:Router,
     private tokenservice:TokenserviceService,
     private userstore:UserstoreService,
     ) {

  }
  ngOnInit():void {
      this.signupForm = this.fb.group({
       name:['',Validators.required],
       surname:['',Validators.required],
       email:['',Validators.required],
       phone:['',Validators.required],
       role:['admin'],
       password:['',Validators.required,Validators.minLength(7)],
       cpassword:['',Validators.required,Validators.minLength(7)]
      })
  }
  onSubmit() {
    if (this.signupForm.value['password'] ==this.signupForm.value['cpassword']) {
      alert("Passwords must match")
    }
    if (this.signupForm.valid) {
      console.log(this.signupForm.value)
      this.auth.signup(this.signupForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message)
          this.signupForm.reset
          this.router.navigate(["home"])
  
        }),
        error:(err=>{
          //alert(err?.error)
        })
      })

    }
    else {
          this.validateAllFormFields(this.signupForm);
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
