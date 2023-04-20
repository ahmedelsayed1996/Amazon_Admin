import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { usersRoutes } from './lib.routes';
import { LoginComponent } from './pages/login/login.component';
const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  }
]
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    LoginComponent
  ],
})
export class UsersModule { }
