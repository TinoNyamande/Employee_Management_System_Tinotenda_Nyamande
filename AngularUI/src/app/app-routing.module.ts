import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LeaveApplicationComponent } from './components/leave-application/leave-application.component';
import { LeaveApprovalComponent } from './components/leave-approval/leave-approval.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { authGuard } from './guards/auth.guard';
import { ViewusersComponent } from './components/viewusers/viewusers.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { roleGuard } from './guards/role.guard';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { canAddUsersGuard } from './guards/can-add-users.guard';
import { ViewleaveapplicationComponent } from './components/viewleaveapplication/viewleaveapplication.component';
import { ViewperformancesComponent } from './components/viewperformances/viewperformances.component';
import { MyapplicationsComponent } from './components/myapplications/myapplications.component';
import { EmployeeperformancesComponent } from './components/employeeperformances/employeeperformances.component';
import { ErrorhandlerComponent } from './components/errorhandler/errorhandler.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  {path:"home",title:"EMS-Log in" ,component:LoginComponent},
  {path:"" ,redirectTo:"/home",pathMatch:"full"},
  {path:"signup" , component:SignupComponent},
  {path:"leave-application",component:LeaveApplicationComponent,canActivate:[authGuard]},
  {path:"view-performances",component:ViewperformancesComponent},
  {path:"view-all-performances",component:EmployeeperformancesComponent},
 
  {path:"employee-checkin" , component:CheckinComponent,canActivate:[roleGuard]},
  {path:"employee-checkout",component:CheckoutComponent,canActivate:[roleGuard]},
  {path:"dashboard",component:AdmindashboardComponent},
  {path:"user-dashboard" , component:UserdashboardComponent,canActivate:[authGuard]},
  {path:"view-employees",component:ViewusersComponent,canActivate:[roleGuard]},
  {path:"view-employees/:email",component:ReportsComponent,canActivate:[roleGuard]},
  {path:"add-employees" ,component:AddUserComponent,canActivate:[roleGuard]},
  {path:"create-company" ,component:CreateCompanyComponent,canActivate:[roleGuard]},
  {path:"view-leave-applications",component:ViewleaveapplicationComponent,canActivate:[roleGuard]},
  {path:"view-leave-applications/:id",component:LeaveApprovalComponent,canActivate:[roleGuard]},
  {path:"view-my-applications",component:MyapplicationsComponent,canActivate:[authGuard]},
  {path:"404" , component:ErrorhandlerComponent},
  {path:"**" , redirectTo:"/404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
