import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserstoreService } from '../services/userstore.service';
import { inject } from '@angular/core';
import { GetdataService } from '../services/getdata.service';
import { UserapiService } from '../services/userapi.service';

export const canAddUsersGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const userstore = inject(UserstoreService)
  const router = inject(Router);
  const userapi = inject(UserapiService)
  var myemail;
  var val;


  userstore.getEmailFromStore()
  .subscribe(res=>{
    let femail = auth.getEmailFromToken();
   myemail = femail||res
  })


  userapi.checkCompany(myemail)
  .subscribe({
    next:(res)=>{
      console.log("Can")
      val= true;

    },
    error:(err)=>{
      alert(err.message)
      router.navigate(["create-company"])
      console.log(myemail)
      console.log("Cannot")
      val =false
    }
  })
  return val;

};
