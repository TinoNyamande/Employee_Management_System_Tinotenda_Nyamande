import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { NgToastService } from 'ng-angular-popup';
import { NotFoundError, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { TokenserviceService } from 'src/app/services/tokenservice.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
         faUser = faUser;
         faLock = faLock;
         public role = "";
         

         showPassword:boolean = false ;
         checked:string = "";
         public togglePassword () {
          this.showPassword = !this.showPassword;
          this.checked = "checked";
         }

         loginForm:FormGroup;
         public resetPasswordEmail:string;
         public isValidEmail:boolean;
         constructor(
          private fb:FormBuilder ,
           private auth:AuthService,
           private tokenservice:TokenserviceService,
           private router:Router,
           private userstore:UserstoreService,
           private toast:NgToastService,
           private sendresetlink:ResetPasswordService
           ) {

         }
         ngOnInit():void {
             this.loginForm = this.fb.group({
              email:['',Validators.required],
              password:['',Validators.required]
             })
         }
         onSubmit() {
          if (this.loginForm.valid) {
            
            this.auth.login(this.loginForm.value).
            subscribe({
              next:(res)=>{
                
                this.auth.storeToken(res.accessToken)
                this.auth.storeRefreshToken(res.refreshToken);
                const tokenPayload = this.auth.decodedToken();
                this.userstore.setRoleForStore(tokenPayload.role)
                this.userstore.setEmailForStore(tokenPayload.email)
                this.auth.isLogged.next(true);
                this.userstore.getRoleFromStore()
                .subscribe(res=>{
                  
                  let frole = this.auth.getRoleFromToken();
                 this.role = res||frole;
                 console.log(this.role)
                 this.router.navigate(["dashboard"])
                 this.router.navigate(["dashboard"])
                 //let location = window.location;
                 //location.href = "http://localhost:4200/dashboard";
                // window.location.reload();
              
                })
                console.log(this.auth.isLogged)
                
                alert("Login Successful")
               // window.location.reload();
                this.loginForm.reset()
                //this.tokenservice.storeToken(res.accessToken)
                
               
                  
              },
              error:(err)=>{
                console.log(err)
                //alert("Invalid details")
                
              }
            })
         
          
          }
          else {
                this.validateAllFormFields(this.loginForm);
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
         checkValidEmail(event:string) {
          const value = event;
         const patten = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
         this.isValidEmail = patten.test(value)
         return this.isValidEmail;
         }
         confirmSend() {
          if (this.checkValidEmail(this.resetPasswordEmail)) {
            console.log(this.resetPasswordEmail)
            
            this.sendresetlink.sendPasswordLink(this.resetPasswordEmail)
            .subscribe({
              next:(res)=>{
                alert(res.message)
                this.resetPasswordEmail = ""
                const buttonRef = document.getElementById("closeBtn")
                buttonRef?.click();    
              },
              error:(err)=>{
                  alert(err.message)
              }
            })
          }
         }
}
