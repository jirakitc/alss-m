import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './comp/user/user.component';
import { AddUserComponent } from './comp/add-user/add-user.component';
import { UserDetailsComponent } from './comp/user-details/user-details.component';
import { HomeComponent } from './comp/home/home.component';
import { RegisterComponent } from './comp/register/register.component';
import { EditComponent } from './comp/edit/edit.component';
import { LoginComponent } from './comp/login/login.component';
import { ProfileComponent } from './comp/profile/profile.component';
import { AddClassComponent } from './comp/add-class/add-class.component';
import { EnrollComponent } from './comp/enroll/enroll.component';
import { AddSubjectComponent } from './comp/add-subject/add-subject.component';
import { EnrollclassComponent } from './comp/enrollclass/enrollclass.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'user/add', component: AddUserComponent},
  {path: 'users/:id',component: UserDetailsComponent},
  {path: 'edit',component: EditComponent},
  {path: 'profile',component: ProfileComponent},
  {path: 'home',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'add-class',component: AddClassComponent},
  {path: 'enroll',component: EnrollComponent},
  {path: 'enroll/:id',component: EnrollclassComponent},
  {path: 'add_subject',component: AddSubjectComponent},
  {path: '', redirectTo: 'home',pathMatch: 'full'}, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
