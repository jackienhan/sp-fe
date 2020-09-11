import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../component/login/login.component';
import {RegisterComponent} from '../component/register/register.component';
import {UserComponent} from '../component/user/user.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/management', component: UserComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];
// export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
