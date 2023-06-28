import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserstoreService } from '../services/userstore.service';

export const roleGuard: CanActivateFn = (route, state) => {
  var role = "";
  const auth = inject(AuthService)
  const userstore = inject(UserstoreService)
  const router = inject(Router);
  
  userstore.getRoleFromStore()
  .subscribe(res=>{
    let frole = auth.getRoleFromToken();
    role = frole
  })
  if (auth.isloggedIn()  && role=="admin") {
    return true;
  } else {
    alert("you dont have the permission to view this page")
    router.navigate(["home"])
    return false;
  }
};
