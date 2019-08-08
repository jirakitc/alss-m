import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '../comp/user/user.component';
import { AddUserComponent } from '../comp/add-user/add-user.component';
import { UserDetailsComponent } from '../comp/user-details/user-details.component';
import { HomeComponent } from '../comp/home/home.component';
import { RegisterComponent } from '../comp/register/register.component';
import { EditComponent } from '../comp/edit/edit.component';
import { LoginComponent } from '../comp/login/login.component';
import { ProfileComponent } from '../comp/profile/profile.component';
import { AddClassComponent } from '../comp/add-class/add-class.component';
import { EnrollComponent } from '../comp/enroll/enroll.component';
import { AddSubjectComponent } from '../comp/add-subject/add-subject.component';
import { ClassDataComponent } from '../comp/profile/class-data/class-data.component';
import { ShowClassEnrolledComponent } from '../comp/profile/show-class-enrolled/show-class-enrolled.component';
import { AuthService } from '../services/auth.service';

import { AdmincenterComponent } from '../comp/admin/admincenter/admincenter.component';

import { Role } from '../services/interface'

import { AuthGuardService } from '../services/auth-guard.service';
import { RoleGuardService } from '../services/role-guard.service';
import { ClassComponent } from '../comp/class/class.component';
import { MainComponent } from '../class/main/main.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'user/add', component: AddUserComponent},
  {path: 'users/:id',component: UserDetailsComponent},
  {path: 'allclass',component: ClassComponent, canActivate: [AuthGuardService]},
  {path: 'edit',component: EditComponent},
  {path: 'profile',component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'profile/:userId',component :ShowClassEnrolledComponent, canActivate: [AuthGuardService]},
  {path: 'home',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'add-class',component: AddClassComponent},
  {path: 'enroll',component: EnrollComponent, canActivate: [AuthGuardService]},
  {path: 'add_subject',component: AddSubjectComponent, canActivate: [AuthGuardService]},

  {path: 'class/:classId' , component: MainComponent},
  {path: '**',component: HomeComponent},

  {path: 'admin',
    component: AdmincenterComponent,
    canActivate: [AuthGuardService],
    data: {Role : [3 , '3' , 'admin']}
  }
  // {path: '', redirectTo: 'home',pathMatch: 'full'}, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuardService],
})
export class AppRoutingModule { }
