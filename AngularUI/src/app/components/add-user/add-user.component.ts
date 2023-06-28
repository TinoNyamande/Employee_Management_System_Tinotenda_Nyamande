import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  implements OnInit{
     myemail:string;
     signupForm:FormGroup;
     public users:any = [];
     companyId:number;
     constructor(private auth:AuthService,
      private router:Router,
      private fb:FormBuilder,
      private userapi:UserapiService,
      private userstore:UserstoreService ,
      private authservice:AuthService,
      private api:UserapiService) {}
      
      logout() {
        this.authservice.logout();
      }

     ngOnInit(): void {
      this.userstore.getEmailFromStore()
      .subscribe(res=>{
        let femail = this.auth.getEmailFromToken();
       this.myemail = femail||res
       console.log(this.myemail)
       
      })

    
      

         
          this.signupForm = this.fb.group({
          name:['',Validators.required],
          surname:['',Validators.required],
          email:['',Validators.required],
          phone:['',Validators.required],
          companyId:[0],
          role:['user',Validators.required],
          password:['',Validators.required],
          cpassword:['',Validators.required],
          companyName:[this.myemail]
       })
  
    
    }

     showPassword:boolean = false ;
     checked:string = "";
     public togglePassword () {
      this.showPassword = !this.showPassword;
      this.checked = "checked";
     }
  
      onSubmit() {
        if (this.signupForm.valid) {
          console.log(this.signupForm.value)
             this.auth.addUser(this.signupForm.value)
              .subscribe({
                next:(res)=>{
                      alert(res.message)
                      this.router.navigate(["view-employees"])
                    
               },
               error:(err)=>{
                    //alert("You need to create a company first")
                    this.router.navigate(["create-company"])
                }
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

