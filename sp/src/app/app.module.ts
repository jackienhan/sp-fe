import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './service/authentication.service';
import {UserService} from './service/user.service';
import {authInterceptorProviders} from './interceptor/auth.interceptor';
import {AuthenticationGuard} from './guard/authentication.guard';
import {NotificationModule} from './notification.module';
import {NotificationService} from './service/notification.service';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {UserComponent} from './component/user/user.component';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule
  ],
  providers: [AuthenticationGuard, AuthenticationService, NotificationService, JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    UserService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
