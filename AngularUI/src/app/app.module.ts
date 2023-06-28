import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeaveApplicationComponent } from './components/leave-application/leave-application.component';
import { LeaveApprovalComponent } from './components/leave-approval/leave-approval.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HttpClient } from '@angular/common/http';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { PerformanceTableComponent } from './components/performance-table/performance-table.component';
import { UserapiService } from './services/userapi.service';
import { ViewusersComponent } from './components/viewusers/viewusers.component';
import { ViewperformancesComponent } from './components/viewperformances/viewperformances.component';
import { ViewleaveapplicationComponent } from './components/viewleaveapplication/viewleaveapplication.component';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MyapplicationsComponent } from './components/myapplications/myapplications.component';
import { EmployeeperformancesComponent } from './components/employeeperformances/employeeperformances.component';
import { ErrorhandlerComponent } from './components/errorhandler/errorhandler.component';
import { ApproveComponent } from './components/approve/approve.component';
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LeaveApplicationComponent,
    LeaveApprovalComponent,
    CheckinComponent,
    CheckoutComponent,
    AdmindashboardComponent,
    PerformanceTableComponent,
    ViewusersComponent,
    ViewperformancesComponent,
    ViewleaveapplicationComponent,
    UserdashboardComponent,
    AddUserComponent,
    CreateCompanyComponent,
    SidebarComponent,
    MyapplicationsComponent,
    EmployeeperformancesComponent,
    ErrorhandlerComponent,
    ApproveComponent,
    ReportsComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgToastModule
  ],
  providers: [UserapiService ,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
