import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { TokenserviceService } from 'src/app/services/tokenservice.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent {


  cForm:FormGroup;
  public users:any = [];
  companyId:number;


  constructor(
    private fb:FormBuilder ,
     private auth:AuthService,
     private tokenservice:TokenserviceService,
     private router:Router,
     private userstore:UserstoreService,
     private toast:NgToastService,
     private userapi:UserapiService,
     private authservice:AuthService,
     ) {

   }
 cemail:string = "";
created:any = new Date();
  ngOnInit():void {

    
    this.userstore.getEmailFromStore()
    .subscribe(res=>{
      let femail = this.auth.getEmailFromToken();
     this.cemail = femail||res
    })
    
      this.cForm = this.fb.group({
       companyName:['',Validators.required],
       email:[this.cemail],
       created:[this.created]
      })
     
  }
  logout() {
    this.authservice.logout();
  }
  onSubmit() {
   if (this.cForm.valid) {

    this.userapi.checkCompany(this.cemail)
    .subscribe({
      next:(res)=>{
         alert("You already have a company. Consider signing up with a different email") 
      },
      error:(err)=>{
        this.userapi.createCompany(this.cForm.value).subscribe({
          next:(res)=>{
            alert(res.message)
            this.cForm.reset()
            this.router.navigate(["dashboard"])
            
          },
          error:(err)=>{
            //alert(err?.error.message)
            //this.router.navigate(["home"]);
          }
        })
      }
    })

  
   
   }
   else {
         this.validateAllFormFields(this.cForm);
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
